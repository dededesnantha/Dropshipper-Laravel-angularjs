<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\tb_transaksi;
use Carbon\Carbon;
use App\Models\tb_order;
use App\Models\tb_user;
use Cookie;
use Illuminate\Support\Facades\Crypt;
use Mail;

class TransaksiController extends Controller
{

     public function date_convert($date)
    {        
        $date = strtotime($date);
        $now_date = time();
        $range = (int) round(($now_date - $date) / (60 * 60 * 24));

        $month = ['Januari','February','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];         
        $sort_month = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
        $convert = array(            
            'long_month' => $month[(int) date("m",$date) - 1],
            'sort_month' => $sort_month[(int) date("m",$date) - 1],
            'day' => date("l",$date),
            'sort_day' => date("D",$date),            
            'second' => date("s",$date),
            'month' => date("m",$date),
            'menit' => date("M",$date),            
            'year' => date("Y",$date),
            'sort_year' => date("y",$date),
            'date' => date("d",$date),
            'minute' => date("i",$date),
            'hour' => date("H",$date),
            'distance' => $range
        );

        switch (date("l",$date)) {
            case 'Sunday':
                $convert['day'] = "Minggu";
                break;
            case 'Monday':
                $convert['day'] = "Senin";
                break;
            case 'Tuesday':
                $convert['day'] = "Selasa";
                break;
            case 'Wednesday':
                $convert['day'] = "Rabu";
                break;
            case 'Thursday':
                $convert['day'] = "Kamis";
                break;
            case 'Friday':
                $convert['day'] = "Jumat";
                break;
            case 'Saturday':
                $convert['day'] = "Sabtu";
                break;
            
            default:
                
                break;
        }
        return $convert;
    }

    public function add_transaksi(Request $request)
    {
    	$post = $request->input();
        $latestOrder = tb_user::where('id_user',$post['id_user'])->select('telephone')->first();
        $transaksi = tb_transaksi::orderBy('id_transaksi','DESC')->select('id_transaksi')->first();
        $count_codes = 1;
        do {
            if (empty($transaksi->id_transaksi)) {
                $codes = '#'.str_pad(1, 15, $latestOrder->telephone, STR_PAD_LEFT);
            }else{
                $codes = '#'.str_pad($transaksi->id_transaksi + 1, 15, $latestOrder->telephone, STR_PAD_LEFT);
            }
            $count_codes = tb_transaksi::where('code_transaksi','=', $codes)->count();
            if ($count_codes == 0) {
                $count_codes--;
            }else{
                $codes = '#'.$latestOrder->telephone.substr(uniqid(rand(), true), 3, 3);
                $count_codes = 1;
            }
            
        } while ($count_codes > 0);
        $data = [
    		'total_transkasi' => $post['subtotal'],
    		'id_ongkir' => $post['ongkirs'],
            'id_user' => $post['id_user'],
            'code_transaksi' => $codes
    	];
    	$id = tb_transaksi::create($data)->id;
        $cookie_data = stripslashes(Cookie::get('cart'));
        $cart_data = json_decode($cookie_data, true);
        foreach ($cart_data as $key => $datasss) {
            tb_order::create([
               'id_produk' => $datasss['id_produk'],
               'id_color' => $datasss['id_color'],
               'kuantitas' => $datasss['kuantitas'],
               'size' => $datasss['size'],
               'id_transaksi' => $id
           ]);
        }
        $encrypted = Crypt::encryptString($id);
    	return response()->json($encrypted,200);
    }

    public function payment_get($id)
    {   
        $id = Crypt::decryptString($id);
        $data = tb_transaksi::where('id_transaksi', $id)->select('total_transkasi')->first();
        return $data;
    }
    public function transaction_end($id)
    {
        $id = Crypt::decryptString($id);
        $data = [
            'tgl_transkasi' => Carbon::now()->toDateTimeString(),
            'status_transaksi' => "pembayaran",
            'metode_transaksi' => 'Transfer Bank',
            'tgl_expired' => Carbon::now()->addDays(2)->toDateTimeString()
        ];
        tb_transaksi::where('id_transaksi', $id)->update($data);
        $data_transaksi = tb_transaksi::where('id_transaksi', $id)
                            ->join('tb_ongkir', 'tb_transaksi.id_ongkir','=','tb_ongkir.id_ongkir')
                            ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                            ->join('tb_provinsi', 'tb_user.id_provinsi','=','tb_provinsi.id_provinsi')
                            ->join('tb_kabupaten', 'tb_user.id_kabupaten','=','tb_kabupaten.id_kabupaten')
                            ->join('tb_kecamatan', 'tb_user.id_kecamatan','=','tb_kecamatan.id_kecamatan')
                            ->select('tb_transaksi.id_transaksi',
                                'tb_transaksi.id_transaksi',
                                'tb_transaksi.tgl_transkasi',
                                'tb_transaksi.total_transkasi',
                                'tb_transaksi.metode_transaksi',
                                'tb_transaksi.code_transaksi',
                                'tb_transaksi.tgl_expired',
                                'tb_ongkir.harga',
                                'tb_user.nama',
                                'tb_user.email',
                                'tb_user.address',
                                'tb_user.telephone',
                                'tb_provinsi.provinsi',
                                'tb_kabupaten.kabupaten',
                                'tb_kecamatan.kecamatan')->first();
        $temp_date = $this->date_convert($data_transaksi->tgl_expired);
        $data_transaksi->tgl_expired =  $temp_date['date'].' '.$temp_date['sort_month'].' '.$temp_date['year'];
        $data_transaksi->id_transaksi = Crypt::encryptString($data_transaksi->id_transaksi);
        $data_transaksi_detail = tb_order::where('id_transaksi', $id)
                        ->join('tb_produk', 'tb_order.id_produk','=','tb_produk.id')
                        ->leftJoin('tb_color','tb_order.id_color','=','tb_color.id')
                        ->select('tb_produk.nama_produk',
                            'tb_produk.harga',
                            'tb_produk.harga_promo',
                            'tb_produk.jenis_label',
                            'tb_produk.text_label',
                            'tb_produk.gambar',
                            'tb_produk.slug',
                            'tb_produk.stok',
                            'tb_color.color',
                            'tb_color.text',
                            'tb_order.kuantitas',
                            'tb_order.size')->get();
        $total_produk = 0;
        $total_kuantitas = 0;
        foreach ($data_transaksi_detail as $key => $value) {
            if ($value->harga_promo == null) {
                $total_produk += $value->kuantitas * $value->harga;
                $data_transaksi_detail[$key]->totals_produks = $value->kuantitas * $value->harga;
            }else{
                $total_produk += $value->kuantitas * $value->harga_promo;
                $data_transaksi_detail[$key]->totals_produks = $value->kuantitas * $value->harga_promo;
            }
            $total_kuantitas += $value->kuantitas;
        }
        $data_transaksi->total_produk = $total_produk;
        $data_transaksi->total_kuantitas = $total_kuantitas;
        $details = [
            'data_transaksi' => $data_transaksi,
            'data_transaksi_detail' => $data_transaksi_detail,
        ];
        \Mail::to($data_transaksi['email'])->send(new \App\Mail\MailPembayaran($details));
        \Cookie::queue(\Cookie::forget('cart'));
        $encrypted = Crypt::encryptString($id);
        return response()->json($encrypted,200);
    }

    public function transaction_get($id)
    {
        $id = Crypt::decryptString($id);
        $data_transaksi = tb_transaksi::where('id_transaksi', $id)
                            ->select('tb_transaksi.id_transaksi',
                                'tb_transaksi.id_transaksi',
                                'tb_transaksi.tgl_transkasi',
                                'tb_transaksi.total_transkasi',
                                'tb_transaksi.metode_transaksi',
                                'tb_transaksi.code_transaksi',
                                'tb_transaksi.tgl_expired')->first();
        $temp_date = $this->date_convert($data_transaksi->tgl_expired);
        $data_transaksi->tgl_expired =  $temp_date['date'].' '.$temp_date['sort_month'].' '.$temp_date['year'];
        $data_transaksi->id_transaksi = Crypt::encryptString($data_transaksi->id_transaksi);
        return response()->json($data_transaksi,200);
    }

    public function detail_transaksi($id)
    {
        $id = Crypt::decryptString($id);
        $data_transaksi = tb_transaksi::where('id_transaksi', $id)
                            ->where('tb_transaksi.tgl_expired','>=',date('Y-m-d'))
                            ->join('tb_ongkir', 'tb_transaksi.id_ongkir','=','tb_ongkir.id_ongkir')
                            ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                            ->join('tb_provinsi', 'tb_user.id_provinsi','=','tb_provinsi.id_provinsi')
                            ->join('tb_kabupaten', 'tb_user.id_kabupaten','=','tb_kabupaten.id_kabupaten')
                            ->join('tb_kecamatan', 'tb_user.id_kecamatan','=','tb_kecamatan.id_kecamatan')
                            ->select('tb_transaksi.id_transaksi',
                                'tb_transaksi.id_transaksi',
                                'tb_transaksi.tgl_transkasi',
                                'tb_transaksi.total_transkasi',
                                'tb_transaksi.metode_transaksi',
                                'tb_transaksi.code_transaksi',
                                'tb_transaksi.tgl_expired',
                                'tb_transaksi.image_transfer',
                                'tb_transaksi.tgl_konfirm',
                                'tb_ongkir.harga',
                                'tb_user.nama',
                                'tb_user.email',
                                'tb_user.address',
                                'tb_user.telephone',
                                'tb_provinsi.provinsi',
                                'tb_kabupaten.kabupaten',
                                'tb_kecamatan.kecamatan')->first();
        
        if ($data_transaksi !== null) {
            $temp_date = $this->date_convert($data_transaksi->tgl_expired);
            $data_transaksi->tgl_expired =  $temp_date['date'].' '.$temp_date['sort_month'].' '.$temp_date['year'];
            $data_transaksi->id_transaksi = Crypt::encryptString($data_transaksi->id_transaksi);
            $data_transaksi_detail = tb_order::where('id_transaksi', $id)
                            ->join('tb_produk', 'tb_order.id_produk','=','tb_produk.id')
                            ->leftJoin('tb_color','tb_order.id_color','=','tb_color.id')
                            ->select('tb_produk.nama_produk',
                                'tb_produk.harga',
                                'tb_produk.harga_promo',
                                'tb_produk.jenis_label',
                                'tb_produk.text_label',
                                'tb_produk.gambar',
                                'tb_produk.slug',
                                'tb_produk.stok',
                                'tb_color.color',
                                'tb_color.text',
                                'tb_order.kuantitas',
                                'tb_order.size')->get();
            $total_produk = 0;
            $total_kuantitas = 0;
            foreach ($data_transaksi_detail as $key => $value) {
                if ($value->harga_promo == null) {
                    $total_produk += $value->kuantitas * $value->harga;
                    $data_transaksi_detail[$key]->totals_produks = $value->kuantitas * $value->harga;
                }else{
                    $total_produk += $value->kuantitas * $value->harga_promo;
                    $data_transaksi_detail[$key]->totals_produks = $value->kuantitas * $value->harga_promo;
                }
                $total_kuantitas += $value->kuantitas;
            }
            $data_transaksi->total_produk = $total_produk;
            $data_transaksi->total_kuantitas = $total_kuantitas;
            $details = [
                'data_transaksi' => $data_transaksi,
                'data_transaksi_detail' => $data_transaksi_detail,
            ];
            return response()->json($details,200);
        }else{
            return response()->json(['status' => 'expired' ],200);
        }
    }

    public function update_transaksi(Request $request)
    {
       $post = $request->input();
       $date_konfrim = date('Y-m-d', strtotime($post['tgl_konfirm']));
       $id = Crypt::decryptString($post['id_transaksi']);
       tb_transaksi::where('id_transaksi', $id)->update([
        'tgl_konfirm' => $date_konfrim,
        'image_transfer' => $post['image_transfer']['data'],
        'bank_transfer' => $post['bank_transfer'],
        'status_transaksi' => 'Order'
       ]);
       $datas = tb_transaksi::where('id_transaksi',$id)
                ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                ->select('tb_user.email','tb_transaksi.total_transkasi','tb_transaksi.tgl_konfirm','tb_transaksi.code_transaksi','tb_transaksi.status_transaksi')
                ->first();
        $date = $this->date_convert($datas->tgl_konfirm);
        $tgl_konfirm =  $date['date'].' '.$date['sort_month'].' '.$date['year'];
        $details = [
            'total_transkasi' => $datas->total_transkasi,
            'tgl_konfirm' => $tgl_konfirm,
            'code_transaksi' => $datas->code_transaksi,
            'status_transaksi' => $datas->status_transaksi
        ];
        \Mail::to($datas->email)->send(new \App\Mail\OrderEmail($details));
       return response()->json(200);
    }   
}
