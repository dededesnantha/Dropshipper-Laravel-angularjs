<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\slider;
use App\Models\kategori;
use App\Models\produk;
use App\Models\Size;
use App\Models\Color;
use App\Models\tb_produk_gambar;
use App\Models\tb_user;
use App\Models\tb_ongkir;
use App\Models\tb_transaksi;

use Illuminate\Support\Facades\Crypt;
use Response;


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
                            ->where('tb_produk.stok','>=',1)
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
                             ->where('tb_produk.stok','>=',1)
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
                         ->where('tb_produk.stok','>=',1)
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
                             ->where('tb_produk.stok','>=',1)
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
                             ->where('tb_produk.stok','>=',1)
                            ->whereNull('tb_produk.jenis_label')
                            ->orderBy('tb_produk.id','DESC')
                            ->get();
        return $produk;
    }

    public function card_produk($id)
    {
        $produk = produk::join('tb_kategori', 'tb_produk.id_kategori','=','tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.gambar','tb_produk.status',
                                    'tb_produk.harga','tb_produk.stok','tb_produk.harga_promo','tb_produk.jenis_label',
                                    'tb_produk.text_label','tb_produk.size','tb_produk.warna')
                            ->where('tb_kategori.status','=',1)
                            ->where('tb_produk.status','=',1)
                             ->where('tb_produk.stok','>=',1)
                            ->where('tb_produk.id','=',$id)
                            ->first();
        if ($produk) {
            if ($produk->size !== '') {
                $size = explode(', ', $produk->size);
                $get_size = Size::whereIn('size',$size)->select('id','size')->get();
                foreach ($get_size as $key => $values) {
                    $datas_size[] = [
                        'id' => $values->id,
                        'size' => $values->size
                    ];
                }
                    $produk->size = $datas_size;
                }else{
                    $produk->size = [];
            }
            if ($produk->warna !== '') {
                $warna = explode(', ', $produk->warna);
                $get_size = Color::whereIn('text',$warna)->select('id','color')->get();
                    foreach ($get_size as $key => $values) {
                        $datas_color[] = [
                            'id' => $values->id,
                            'color' => $values->color
                        ];
                    }
                    $produk->warna = $datas_color;
            }else{
                    $produk->warna = [];
            }
        }
        return $produk;
    }

    public function get_ongkir(Request $request)
    {
       $post = $request->input();
        $get_user = tb_user::where('id_user', $post['id_user'])->select('id_provinsi','id_kabupaten','id_kecamatan')->first();
        $data['kurir'] = tb_ongkir::where('tb_ongkir.id_kecamatan','=',$get_user->id_kecamatan)
                                    ->join('tb_kecamatan', 'tb_ongkir.id_kecamatan','=','tb_kecamatan.id_kecamatan')
                                    ->join('tb_kurir','tb_ongkir.id_kurir','=','tb_kurir.id_kurir')
                                    ->select('tb_ongkir.id_ongkir','tb_ongkir.harga','tb_kurir.judul')
                                    ->get();
       return Response::json($data,200);
    }

    public function search($search)
    {
       $data = produk::join('tb_kategori', 'tb_produk.id_kategori','=','tb_kategori.id')
                    ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.gambar','tb_produk.status',
                                    'tb_produk.slug','tb_produk.harga','tb_produk.stok','tb_produk.harga_promo','tb_produk.jenis_label',
                                    'tb_produk.text_label','tb_produk.updated_at')
                    ->where('tb_kategori.status','=',1)
                    ->where('tb_produk.status','=',1)
                    ->where('tb_produk.stok','>',0)
                    ->where('tb_produk.nama_produk','like',"%".$search."%")
                    ->orderBy('tb_produk.id','DESC')
                    ->get();
        return Response::json($data,200);
    }

    public function redirct_email(Request $request)
    {
       if ($request->session()->has('redirect_email')) {
            $id = $request->session()->get('redirect_email');
            $request->session()->forget('redirect_email');
            return Response::json(['id' => $id[0] ], 200);
        }else{
            $request->session()->forget('redirect_email');
            return response()->json(['id' => ''], 200); 
        }
    }

}
