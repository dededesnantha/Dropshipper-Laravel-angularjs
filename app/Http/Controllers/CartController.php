<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\tb_order;

class CartController extends Controller
{
	public function add_cart(Request $request)
    {
    	$post = $request->input();
    	$data = [
    		'id_user' => $post['id_user'],
    		'id_produk' => $post['id_produk'],
    		'id_color' => $post['colors'],
    		'kuantitas' => $post['qty'],
    		'size' => $post['size']
    	];
    	tb_order::create($data);
    	return response()->json(['status'=>'succes'],200);
    }

    public function get_cart(Request $request)
    {
       $post = $request->input();
       $data = tb_order::where('id_user',$post['id_user'])
                ->join('tb_produk','tb_order.id_produk','tb_produk.id')
                ->leftJoin('tb_color','tb_order.id_color','tb_color.id')
                ->select('tb_order.kuantitas as qty','tb_order.size','tb_produk.nama_produk','tb_produk.harga','tb_produk.harga_promo',
                'tb_produk.jenis_label','tb_produk.text_label','tb_produk.gambar','tb_order.id_order','tb_produk.slug')
                ->orderBy('tb_order.id_order','DESC')
                ->get();
       return $data;
    }
    public function delete_cart(Request $request)
    {
        $post = $request->input();
        tb_order::where('id_order', $post[0])->delete();
        return response()->json(['status'=>'succes'],200);
    }
}
