<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\tb_order;
use App\Models\produk;
use App\Models\Color;
use Cookie;

class CartController extends Controller
{
	public function add_cart(Request $request)
    {
    	$post = $request->input();
        if(Cookie::get('cart'))
        {
            $cookie_data = stripslashes(Cookie::get('cart'));
            $cart_data = json_decode($cookie_data, true);
        }
        else
        {
            $cart_data = array();
        }
        $item_id_list = array_column($cart_data, 'id_produk');
        $prod_id_is_there = $post['id_produk'];
        
        if(in_array($prod_id_is_there, $item_id_list))
        {
            $data = false;
            foreach($cart_data as $keys => $values)
            {
                if($values["id_produk"] == $post['id_produk'] && $values["id_color"] == $post['colors'] && $values['size'] == $post['size'])
                {
                    $produks = produk::where('id', $post['id_produk'])->first();
                    $item_kuantitas_list = array_column($cart_data, 'kuantitas');
                    if ($item_kuantitas_list[$keys] >= $produks->stok) {
                        $cart_data[$keys]["kuantitas"] = $produks->stok;
                        $data = true;
                    }else{
                        $cart_data[$keys]["kuantitas"] = $post['qty'] + $item_kuantitas_list[$keys];
                        $data = true;
                    }
                }
            }
            
            if ($data == false) {
                $item_array = array(
                    'id_user' => $post['id_user'],
                    'id_produk' => $post['id_produk'],
                    'id_color' => $post['colors'],
                    'kuantitas' => $post['qty'],
                    'size' => $post['size']
                );
                $cart_data[] = $item_array;
            }

            $item_data = json_encode($cart_data);
            $minutes = 1440;
            Cookie::queue(Cookie::make('cart', $item_data, $minutes));
            return response()->json(['status'=>'succes'],200);
        }else{
            $item_array = array(
                    'id_user' => $post['id_user'],
                    'id_produk' => $post['id_produk'],
                    'id_color' => $post['colors'],
                    'kuantitas' => $post['qty'],
                    'size' => $post['size']
                    );
            $cart_data[] = $item_array;
            $item_data = json_encode($cart_data);
            $minutes = 1440;
            Cookie::queue(Cookie::make('cart', $item_data, $minutes));
        	return response()->json(['status'=>'succes'],200);
        }

    }

    public function get_cart()
    {
        if (Cookie::get('cart')) {
            $cookie_data = stripslashes(Cookie::get('cart'));
            $cart_data = json_decode($cookie_data, true);
            
            $data = [];
            foreach ($cart_data as $key => $datas) {
                $data[$key] = produk::where('id', $datas['id_produk'])
                                ->select('id','nama_produk','harga','harga_promo','jenis_label','text_label','gambar','slug','stok')
                                ->first();
                $data[$key]->color = Color::where('id', $datas['id_color'])
                                ->select('color','id')
                                ->first();
                $data[$key]->qty = $datas['kuantitas'];
                $data[$key]->size = $datas['size'];
            }
        }else{
            $data = '';
        }
       return $data;
    }
    public function delete_cart(Request $request)
    {
        $post = $request->input();

        $cookie_data = stripslashes(Cookie::get('cart'));
        $cart_data = json_decode($cookie_data, true);

        $item_id_list = array_column($cart_data, 'id_produk');

        $prod_id_is_there = $post['id'];

        if(in_array($prod_id_is_there, $item_id_list))
        {
            foreach($cart_data as $keys => $values)
            { 
                if($keys == $post['no_array'])
                {
                    unset($cart_data[$keys]);
                }
            }
            $item_data = json_encode(array_values($cart_data));
            $minutes = 1440;
            Cookie::queue(Cookie::make('cart', $item_data, $minutes));
            return response()->json(['status'=>'succes'],200);

        }
    }
    public function update_cart(Request $request)
    {
        $post = $request->input();
        $cart_data = array();
        foreach ($post as $key => $datss) {
                $item_array = array(
                    'id_produk' => $datss['id'],
                    'id_color' => $datss['color']['id'] ?? NULL,
                    'kuantitas' => $datss['qty'],
                    'size' => $datss['size'] ?? NULL
                );
                $cart_data[] = $item_array;
        }
        $item_data = json_encode($cart_data);
        $minutes = 1440;
        Cookie::queue(Cookie::make('cart', $item_data, $minutes));
        return response()->json(['status'=>'succes'],200);
    }

    public function count_cart()
    {
        $cookie_data = stripslashes(Cookie::get('cart'));
        $cart_data = json_decode($cookie_data, true);
        if ($cart_data == null) {
            $data = 0;
        }else{
            $data = count($cart_data);
        }
        return $data;
    }
}
