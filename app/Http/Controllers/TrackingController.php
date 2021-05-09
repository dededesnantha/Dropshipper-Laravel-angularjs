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
		$transaksi = tb_transaksi::where('id_user', $id)->whereNotNull('status_transaksi')
					->whereNotNull('metode_transaksi')
					->whereNotNull('tgl_transkasi')
					->where('tgl_expired','>=',date('Y-m-d'))
					->orderBy('id_transaksi','DESC')
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
					->where('tgl_expired','>=',date('Y-m-d'))
					->count();
		return $transaksi;
    }
}
