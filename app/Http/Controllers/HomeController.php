<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\slider;
use App\Models\kategori;
use App\Models\produk;
use App\Models\Size;
use App\Models\Color;
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
    	$data = kategori::select('title','gambar','status','slug')->where('status','=',1)->limit(6)->get();
        return $data; 
    }
    public function kategori_all()
    {
        $data = kategori::select('title','gambar','status','slug')->where('status','=',1)->get();
        return $data;
    }
    public function get_kategori_produk($slug)
    {
        $data['kategori'] = kategori::where('slug', $slug)
                        ->where('status','=',1)
                        ->select('id', 'title','gambar','status','slug')
                        ->first();
        $data['produk'] = produk::where('id_kategori', $data['kategori']->id)
                        ->where('status','=',1)
                        ->select('id','nama_produk','gambar','status',
                                'slug','harga','stok','harga_promo','jenis_label',
                                'text_label','updated_at')
                        ->get();
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
            if ($data['produk']->size !== '') {
                $size = explode(', ', $data['produk']->size);
                $get_size = Size::whereIn('size',$size)->select('id','size')->get();
                foreach ($get_size as $key => $values) {
                    $datas_size[] = [
                        'id' => $values->id,
                        'size' => $values->size
                    ];
                }
                $data['produk']->size = $datas_size;
                }else{
                    $data['produk']->size = [];
            }
            if ($data['produk']->warna !== '') {
                $warna = explode(', ', $data['produk']->warna);
                $get_size = Color::whereIn('text',$warna)->select('id','color')->get();
                    foreach ($get_size as $key => $values) {
                        $datas_color[] = [
                            'id' => $values->id,
                            'color' => $values->color
                        ];
                    }
                    $data['produk']->warna = $datas_color;
            }else{
                    $data['produk']->warna = [];
            }
        }
        return $data;
    }
    public function produk_top_all()
    {

        $produk = produk::join('tb_kategori', 'tb_produk.id_kategori','=','tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.gambar','tb_produk.status',
                                    'tb_produk.slug','tb_produk.harga','tb_produk.stok','tb_produk.harga_promo','tb_produk.jenis_label',
                                    'tb_produk.text_label','tb_produk.updated_at')
                            ->where('tb_kategori.status','=',1)
                            ->where('tb_produk.status','=',1)
                            ->whereNotNull('tb_produk.jenis_label')
                            ->orderBy('tb_produk.updated_at','DESC')
                            ->get();
        
        return $produk;
    }

    public function produk_all()
    {
        $produk = produk::join('tb_kategori', 'tb_produk.id_kategori','=','tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.gambar','tb_produk.status',
                                    'tb_produk.slug','tb_produk.harga','tb_produk.stok','tb_produk.harga_promo','tb_produk.jenis_label',
                                    'tb_produk.text_label','tb_produk.updated_at')
                            ->where('tb_kategori.status','=',1)
                            ->where('tb_produk.status','=',1)
                            ->whereNull('tb_produk.jenis_label')
                            ->orderBy('tb_produk.id','DESC')
                            ->get();
        return $produk;
    }
}
