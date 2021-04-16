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
}
