<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\slider;
use App\Models\kategori;
use App\Models\produk;
use App\Models\tb_produk_gambar;

class HomeController extends Controller
{
    public function slider()
    {
        $data = slider::select('judul','image','posisi')->orderBy('posisi','ASC')->get();
        return $data;        
    }
    public function get_kategori()
    {
    	$data = kategori::select('title','gambar','status','slug')->where('status','=',1)->get();
        return $data; 
    }
    public function get_top_produk()
    {
        $produk = produk::join('tb_kategori', 'tb_produk.id_kategori','=','tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.gambar','tb_produk.status',
                                    'tb_produk.slug','tb_produk.harga','tb_produk.stok','tb_produk.harga_promo','tb_produk.jenis_label',
                                    'tb_produk.text_label','tb_produk.updated_at')
                            ->where('tb_kategori.status','=',1)
                            ->where('tb_produk.status','=',1)
                            ->whereNotNull('tb_produk.jenis_label')
                            ->orderBy('tb_produk.updated_at','DESC')
                            ->limit(8)
                            ->get();
        return $produk;
    }
    public function get_produk()
    {
        $produk = produk::join('tb_kategori', 'tb_produk.id_kategori','=','tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.gambar','tb_produk.status',
                                    'tb_produk.slug','tb_produk.harga','tb_produk.stok','tb_produk.harga_promo','tb_produk.jenis_label',
                                    'tb_produk.text_label','tb_produk.updated_at')
                            ->where('tb_kategori.status','=',1)
                            ->where('tb_produk.status','=',1)
                            ->whereNull('tb_produk.jenis_label')
                            ->orderBy('tb_produk.id','DESC')
                            ->limit(12)
                            ->get();
        return $produk;
    }
    public function single_produk($slug)
    {
        $data['produk'] = produk::join('tb_kategori', 'tb_produk.id_kategori','=','tb_kategori.id')
                        ->where('tb_produk.slug', $slug)
                        ->where('tb_kategori.status','=',1)
                        ->where('tb_produk.status','=',1)
                        ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.deskripsi','tb_produk.gambar',
                                'tb_produk.status','tb_produk.harga','tb_produk.stok','tb_produk.size',
                                'tb_produk.warna','tb_produk.harga_promo','tb_produk.jenis_label','tb_produk.text_label')
                        ->first();
                        
        if ($data['produk']) {
            $data['produk']->gambar = tb_produk_gambar::where('id_produk','=',$data['produk']->id)->get();
            // if ($data['produk']->size !==NULL) {
            //     $data['produk']->size = explode(', ', $get_produk->size);
            // }
            // if ($data['produk']->warna !==NULL) {
            //     $data['produk']->warna = explode(', ', $get_produk->warna);
            // }
        }
        return $data;
    }
}
