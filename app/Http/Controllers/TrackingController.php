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

class TrackingController extends Controller
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

    public function get($id)
    {
        $transaksi = tb_transaksi::where('tb_transaksi.id_user', $id)->whereNotNull('tb_transaksi.status_transaksi')
                    ->join('tb_ongkir', 'tb_transaksi.id_ongkir','=','tb_ongkir.id_ongkir')
                    ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                    ->join('tb_provinsi', 'tb_user.id_provinsi','=','tb_provinsi.id_provinsi')
                    ->join('tb_kabupaten', 'tb_user.id_kabupaten','=','tb_kabupaten.id_kabupaten')
                    ->join('tb_kecamatan', 'tb_user.id_kecamatan','=','tb_kecamatan.id_kecamatan')
					->whereNotNull('tb_transaksi.metode_transaksi')
					->whereNotNull('tb_transaksi.tgl_transkasi')
                    ->where('tb_transaksi.status_transaksi','!=','Diterima')
					->orderBy('tb_transaksi.id_transaksi','DESC')
                    ->where(function ($q) {
                            $q->where('tb_transaksi.tgl_expired', '>=', date('Y-m-d'))
                            ->orWhereNull('tb_transaksi.tgl_expired');
                        }
                    )
                    ->get();
		foreach ($transaksi as $key => $rows) {
	    	$temp_date = $this->date_convert($rows->tgl_konfirm);
	        $transaksi[$key]['tgl_konfirm'] =  $temp_date['date'].' '.$temp_date['sort_month'].' '.$temp_date['year'];
	    	$transaksi[$key]['produks'] = tb_order::where('id_transaksi', $rows['id_transaksi'])
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
	        $transaksi[$key]['id_transaksi'] =  Crypt::encryptString($rows['id_transaksi']);

            foreach ($transaksi[$key]['produks'] as $keys => $value) {
                if ($value->harga_promo == null) {
                    $transaksi[$key]['produks'][$keys]['total_produk'] += $value->kuantitas * $value->harga;
                }else{
                    $transaksi[$key]['produks'][$keys]['total_produk'] += $value->kuantitas * $value->harga_promo;
                }
                $transaksi[$key]['produks'][$keys]['total_kuantitas'] += $value->kuantitas;
                $transaksi[$key]['produks'][$keys]['harga_ongkir'] += $rows->harga;
            }
	    }
	    	return $transaksi;
    }

    public function get_tracking($id)
    {
    	$id = Crypt::decryptString($id);
    	$data = tb_transaksi::where('id_transaksi', $id)->first();
    	
    	$temp_date = $this->date_convert($data->tgl_konfirm);
    	$data->tgl_konfirm =  $temp_date['date'].' '.$temp_date['sort_month'].' '.$temp_date['year'];
    	return $data;
    }

    public function count_track($id)
    {
        $transaksi = tb_transaksi::where('id_user', $id)->whereNotNull('status_transaksi')
                    ->whereNotNull('metode_transaksi')
                    ->whereNotNull('tgl_transkasi')
                    ->orderBy('id_transaksi','DESC')
                    ->where(function ($transaksi) {
                            $transaksi->where('tgl_expired', '>=', date('Y-m-d'))
                            ->orWhereNull('tgl_expired');
                        }
                    );
        $transaksi = $transaksi->count();
		return $transaksi;
    }

    public function get_success($id)
    {
        $transaksi = tb_transaksi::where('tb_transaksi.id_user', $id)->whereNotNull('tb_transaksi.status_transaksi')
                    ->join('tb_ongkir', 'tb_transaksi.id_ongkir','=','tb_ongkir.id_ongkir')
                    ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                    ->join('tb_provinsi', 'tb_user.id_provinsi','=','tb_provinsi.id_provinsi')
                    ->join('tb_kabupaten', 'tb_user.id_kabupaten','=','tb_kabupaten.id_kabupaten')
                    ->join('tb_kecamatan', 'tb_user.id_kecamatan','=','tb_kecamatan.id_kecamatan')
                    ->whereNotNull('tb_transaksi.metode_transaksi')
                    ->whereNotNull('tb_transaksi.tgl_transkasi')
                    ->where('tb_transaksi.status_transaksi','=','Diterima')
                    ->orderBy('tb_transaksi.id_transaksi','DESC')
                    ->get();
        foreach ($transaksi as $key => $rows) {
            $temp_date = $this->date_convert($rows->tgl_konfirm);
            $transaksi[$key]['tgl_konfirm'] =  $temp_date['date'].' '.$temp_date['sort_month'].' '.$temp_date['year'];
            $transaksi[$key]['produks'] = tb_order::where('id_transaksi', $rows['id_transaksi'])
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
            $transaksi[$key]['id_transaksi'] =  Crypt::encryptString($rows['id_transaksi']);

            foreach ($transaksi[$key]['produks'] as $keys => $value) {
                if ($value->harga_promo == null) {
                    $transaksi[$key]['produks'][$keys]['total_produk'] += $value->kuantitas * $value->harga;
                }else{
                    $transaksi[$key]['produks'][$keys]['total_produk'] += $value->kuantitas * $value->harga_promo;
                }
                $transaksi[$key]['produks'][$keys]['total_kuantitas'] += $value->kuantitas;
                $transaksi[$key]['produks'][$keys]['harga_ongkir'] += $rows->harga;
            }
        }
            return $transaksi;
    }
}
