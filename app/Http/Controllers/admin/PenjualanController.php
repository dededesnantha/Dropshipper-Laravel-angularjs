<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\tb_transaksi;
use Carbon\Carbon;

class PenjualanController extends Controller
{
   public function date_convert($date)
    {        
        $date = strtotime($date);
        $now_date = time();
        $range = (int) round(($now_date - $date) / (60 * 60 * 24));

        $month = ['Januari','February','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];         
        $sort_month = ['Januari','February','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
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

    public function penjualan_data(Request $request)
    {
    	$post = $request->input();
      if (!empty($post['bulan'])) {                
            $totals = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
                          ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
                          ->join('tb_ongkir','tb_transaksi.id_ongkir' ,'=', 'tb_ongkir.id_ongkir')
                          ->where('tb_transaksi.status_transaksi','=','Diterima')
                          ->select('tb_transaksi.id_transaksi',
                            'tb_transaksi.status_transaksi',
                            'tb_transaksi.code_transaksi',
                            'tb_transaksi.total_transkasi as total_transaksi',
                            'tb_transaksi.tgl_konfirm',
                            'tb_produk.harga',
                            'tb_produk.harga_promo',
                            'tb_ongkir.harga as harga_ongkir',
                            'tb_order.kuantitas')
                          ->whereMonth('tb_transaksi.tgl_konfirm',(int)$post['bulan'])
                          ->get();

            if ($post['search'] == NULL) {
            $data['user'] = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
                        ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                        ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
                        ->where('tb_transaksi.status_transaksi','=','Diterima')
                        ->leftJoin('tb_color','tb_order.id_color','=','tb_color.id')
                        ->select('tb_transaksi.id_transaksi',
                          'tb_transaksi.status_transaksi',
                          'tb_transaksi.code_transaksi',
                          'tb_transaksi.tgl_konfirm',
                          'tb_order.kuantitas',
                          'tb_order.size',
                          'tb_user.nama',
                          'tb_user.address',
                          'tb_produk.harga',
                          'tb_produk.harga_promo',
                          'tb_produk.nama_produk',
                          'tb_color.color',
                          'tb_color.text')
                        ->whereMonth('tb_transaksi.tgl_konfirm',(int)$post['bulan'])
                        ->orderBy('tb_transaksi.id_transaksi',$post['order'])
                        ->paginate($post['much']);  
              }else{
                $data['user'] = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
                        ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                        ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
                        ->where('tb_transaksi.status_transaksi','=','Diterima')
                        ->leftJoin('tb_color','tb_order.id_color','=','tb_color.id')
                        ->select('tb_transaksi.id_transaksi',
                          'tb_transaksi.status_transaksi',
                          'tb_transaksi.code_transaksi',
                          'tb_transaksi.tgl_konfirm',
                          'tb_order.kuantitas',
                          'tb_order.size',
                          'tb_user.nama',
                          'tb_user.address',
                          'tb_produk.harga',
                          'tb_produk.harga_promo',
                          'tb_produk.nama_produk',
                          'tb_color.color',
                          'tb_color.text')
                        ->whereMonth('tb_transaksi.tgl_konfirm',(int)$post['bulan'])
                        ->orderBy('tb_transaksi.id_transaksi',$post['order'])
                        ->where($post['field_search'],'like',"%".$post['search']."%")
                        ->paginate($post['much']);  
              }

        } else if (!empty(@$post['tahun'])) {

          $totals = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
                          ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
                          ->join('tb_ongkir','tb_transaksi.id_ongkir' ,'=', 'tb_ongkir.id_ongkir')
                          ->where('tb_transaksi.status_transaksi','=','Diterima')
                          ->select('tb_transaksi.id_transaksi',
                            'tb_transaksi.status_transaksi',
                            'tb_transaksi.code_transaksi',
                            'tb_transaksi.total_transkasi as total_transaksi',
                            'tb_transaksi.tgl_konfirm',
                            'tb_produk.harga',
                            'tb_produk.harga_promo',
                            'tb_ongkir.harga as harga_ongkir',
                            'tb_order.kuantitas')
                          ->whereYear('tb_transaksi.tgl_konfirm',(int)$post['tahun'])
                          ->get();
            if ($post['search'] == NULL) {
            $data['user'] = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
                        ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                        ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
                        ->where('tb_transaksi.status_transaksi','=','Diterima')
                        ->leftJoin('tb_color','tb_order.id_color','=','tb_color.id')
                        ->select('tb_transaksi.id_transaksi',
                          'tb_transaksi.status_transaksi',
                          'tb_transaksi.code_transaksi',
                          'tb_transaksi.tgl_konfirm',
                          'tb_order.kuantitas',
                          'tb_order.size',
                          'tb_user.nama',
                          'tb_user.address',
                          'tb_produk.harga',
                          'tb_produk.harga_promo',
                          'tb_produk.nama_produk',
                          'tb_color.color',
                          'tb_color.text')
                        ->whereYear('tb_transaksi.tgl_konfirm',(int)$post['tahun'])
                        ->orderBy('tb_transaksi.id_transaksi',$post['order'])
                        ->paginate($post['much']);  
              }else{
                $data['user'] = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
                        ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                        ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
                        ->where('tb_transaksi.status_transaksi','=','Diterima')
                        ->leftJoin('tb_color','tb_order.id_color','=','tb_color.id')
                        ->select('tb_transaksi.id_transaksi',
                          'tb_transaksi.status_transaksi',
                          'tb_transaksi.code_transaksi',
                          'tb_transaksi.tgl_konfirm',
                          'tb_order.kuantitas',
                          'tb_order.size',
                          'tb_user.nama',
                          'tb_user.address',
                          'tb_produk.harga',
                          'tb_produk.harga_promo',
                          'tb_produk.nama_produk',
                          'tb_color.color',
                          'tb_color.text')
                        ->whereYear('tb_transaksi.tgl_konfirm',(int)$post['tahun'])
                        ->orderBy('tb_transaksi.id_transaksi',$post['order'])
                        ->where($post['field_search'],'like',"%".$post['search']."%")
                        ->paginate($post['much']);  
              }
        }else if (!empty(@$post['tahun']) && !empty(@$post['bulan'])){
              $totals = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
              ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
              ->join('tb_ongkir','tb_transaksi.id_ongkir' ,'=', 'tb_ongkir.id_ongkir')
              ->where('tb_transaksi.status_transaksi','=','Diterima')
              ->select('tb_transaksi.id_transaksi',
                'tb_transaksi.status_transaksi',
                'tb_transaksi.code_transaksi',
                'tb_transaksi.total_transkasi as total_transaksi',
                'tb_transaksi.tgl_konfirm',
                'tb_produk.harga',
                'tb_produk.harga_promo',
                'tb_ongkir.harga as harga_ongkir',
                'tb_order.kuantitas')
              ->whereYear('tb_transaksi.tgl_konfirm',(int)$post['tahun'])
              ->whereMonth('tb_transaksi.tgl_konfirm',(int)$post['bulan'])
              ->get();

              if ($post['search'] == NULL) {
                $data['user'] = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
                ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
                ->where('tb_transaksi.status_transaksi','=','Diterima')
                ->leftJoin('tb_color','tb_order.id_color','=','tb_color.id')
                ->select('tb_transaksi.id_transaksi',
                  'tb_transaksi.status_transaksi',
                  'tb_transaksi.code_transaksi',
                  'tb_transaksi.tgl_konfirm',
                  'tb_order.kuantitas',
                  'tb_order.size',
                  'tb_user.nama',
                  'tb_user.address',
                  'tb_produk.harga',
                  'tb_produk.harga_promo',
                  'tb_produk.nama_produk',
                  'tb_color.color',
                  'tb_color.text')
                ->whereYear('tb_transaksi.tgl_konfirm',(int)$post['tahun'])
                ->whereMonth('tb_transaksi.tgl_konfirm',(int)$post['bulan'])
                ->orderBy('tb_transaksi.id_transaksi',$post['order'])
                ->paginate($post['much']);  
              }else{
                $data['user'] = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
                ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
                ->where('tb_transaksi.status_transaksi','=','Diterima')
                ->leftJoin('tb_color','tb_order.id_color','=','tb_color.id')
                ->select('tb_transaksi.id_transaksi',
                  'tb_transaksi.status_transaksi',
                  'tb_transaksi.code_transaksi',
                  'tb_transaksi.tgl_konfirm',
                  'tb_order.kuantitas',
                  'tb_order.size',
                  'tb_user.nama',
                  'tb_user.address',
                  'tb_produk.harga',
                  'tb_produk.harga_promo',
                  'tb_produk.nama_produk',
                  'tb_color.color',
                  'tb_color.text')
                ->whereYear('tb_transaksi.tgl_konfirm',(int)$post['tahun'])
                ->whereMonth('tb_transaksi.tgl_konfirm',(int)$post['bulan'])
                ->orderBy('tb_transaksi.id_transaksi',$post['order'])
                ->where($post['field_search'],'like',"%".$post['search']."%")
                ->paginate($post['much']);  
              }
        }else{
          $totals = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
              ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
              ->join('tb_ongkir','tb_transaksi.id_ongkir' ,'=', 'tb_ongkir.id_ongkir')
              ->where('tb_transaksi.status_transaksi','=','Diterima')
              ->select('tb_transaksi.id_transaksi',
                'tb_transaksi.status_transaksi',
                'tb_transaksi.code_transaksi',
                'tb_transaksi.total_transkasi as total_transaksi',
                'tb_transaksi.tgl_konfirm',
                'tb_produk.harga',
                'tb_produk.harga_promo',
                'tb_ongkir.harga as harga_ongkir',
                'tb_order.kuantitas')
              ->whereMonth('tb_transaksi.tgl_konfirm','=',date('m'))
              ->whereYear('tb_transaksi.tgl_konfirm','=',date('Y'))
              ->get();

          if ($post['search'] == NULL) {
                $data['user'] = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
                ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
                ->where('tb_transaksi.status_transaksi','=','Diterima')
                ->leftJoin('tb_color','tb_order.id_color','=','tb_color.id')
                ->select('tb_transaksi.id_transaksi',
                  'tb_transaksi.status_transaksi',
                  'tb_transaksi.code_transaksi',
                  'tb_transaksi.tgl_konfirm',
                  'tb_order.kuantitas',
                  'tb_order.size',
                  'tb_user.nama',
                  'tb_user.address',
                  'tb_produk.harga',
                  'tb_produk.harga_promo',
                  'tb_produk.nama_produk',
                  'tb_color.color',
                  'tb_color.text')
                ->whereMonth('tb_transaksi.tgl_konfirm','=',date('m'))
                ->whereYear('tb_transaksi.tgl_konfirm','=',date('Y'))
                ->orderBy('tb_transaksi.id_transaksi',$post['order'])
                ->paginate($post['much']);  
              }else{
                $data['user'] = tb_transaksi::join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
                ->join('tb_user', 'tb_transaksi.id_user','=','tb_user.id_user')
                ->join('tb_produk','tb_order.id_produk' ,'=', 'tb_produk.id')
                ->where('tb_transaksi.status_transaksi','=','Diterima')
                ->leftJoin('tb_color','tb_order.id_color','=','tb_color.id')
                ->select('tb_transaksi.id_transaksi',
                  'tb_transaksi.status_transaksi',
                  'tb_transaksi.code_transaksi',
                  'tb_transaksi.tgl_konfirm',
                  'tb_order.kuantitas',
                  'tb_order.size',
                  'tb_user.nama',
                  'tb_user.address',
                  'tb_produk.harga',
                  'tb_produk.harga_promo',
                  'tb_produk.nama_produk',
                  'tb_color.color',
                  'tb_color.text')
                ->whereMonth('tb_transaksi.tgl_konfirm','=',date('m'))
                ->whereYear('tb_transaksi.tgl_konfirm','=',date('Y'))
                ->orderBy('tb_transaksi.id_transaksi',$post['order'])
                ->where($post['field_search'],'like',"%".$post['search']."%")
                ->paginate($post['much']);  
              }
        }
        $this->total_transaksi = 0;
        $this->total_produk = 0;
        $this->total_ongkir = 0;
        foreach ($totals as $key => $value) {
          if ($value->harga_promo == null) {
            $this->total_produk += $value['harga'] * $value['kuantitas'];
          }else{
            $this->total_produk += $value['harga_promo'] * $value['kuantitas'];
          }
          $this->total_ongkir += $value['harga_ongkir'];
        }
        $this->total_transaksi = $this->total_produk + $this->total_ongkir;

        $data['total_produk'] = $this->total_produk;
        $data['total_ongkir'] = $this->total_ongkir;
        $data['total_transaksi'] = $this->total_transaksi;
        

        foreach ($data['user'] as $key => $rows) {
          if ($value->harga_promo == null) {
            $data['user'][$key]['total_produks'] = $rows['harga'] * $rows['kuantitas'];
          }else{
           $data['user'][$key]['total_produks'] = $rows['harga_promo'] * $rows['kuantitas'];
          }
        }

        return $data;
    }

    public function grafik(Request $request)
    {
        $post = $request->input();
        $tb_transaksi = [];

        $bulan = array('Januari' => 0, 
          'Februari'  => 0,
          'Maret'  => 0,
          'April'  => 0,
          'Mei'  => 0,
          'Juni'  => 0,
          'Juli'  => 0,
          'Augustus'  => 0,
          'September'  => 0,
          'October' => 0,
          'November'  => 0,
          'Desember'  => 0);

        if (!empty(@$post['tahun'])) {

          $tb_transaksi = tb_transaksi::whereYear('tb_transaksi.tgl_konfirm',(int)$post['tahun'])
          ->where('tb_transaksi.status_transaksi','=','Diterima')
          ->join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
          ->select(DB::raw('COUNT(tb_transaksi.id_transaksi) as total'), DB::raw('YEAR(tb_transaksi.tgl_konfirm) as year, MONTH(tb_transaksi.tgl_konfirm) month'))
          ->groupBy('year','month')
          ->get();
        
        }else{
          $tb_transaksi = tb_transaksi::whereYear('tb_transaksi.tgl_konfirm',date('Y'))
          ->where('tb_transaksi.status_transaksi','=','Diterima')
          ->join('tb_order','tb_transaksi.id_transaksi','=','tb_order.id_transaksi')
          ->select(DB::raw('COUNT(tb_transaksi.id_transaksi) as total'), DB::raw('YEAR(tb_transaksi.tgl_konfirm) as year, MONTH(tb_transaksi.tgl_konfirm) month'))
          ->groupBy('year','month')
          ->get();
        }


        $moth_transaksi = [];
        foreach ($tb_transaksi as $key => $value) {
          $temp_date = $this->date_convert($value['year'].'-'.$value['month'].'-1');
          $moth_transaksi[$temp_date['sort_month']] = $value['total'];
        }
        $delete_array = array_diff_key($bulan, $moth_transaksi);
        $data_transaksi = array_merge($delete_array, $moth_transaksi);

        $chart = [];
        $chart['labels'] = (array_keys($data_transaksi));
        $chart['dataset'] = ($data_transaksi);
        return $chart;
    }
}
