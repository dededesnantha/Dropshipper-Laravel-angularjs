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

class TransaksiController extends Controller
{
    public function add_transaksi(Request $request)
    {
    	$post = $request->input();
        $latestOrder = tb_user::where('id_user',$post['id_user'])->select('telephone')->first();
        $transaksi = tb_transaksi::orderBy('id_transaksi','DESC')->select('id_transaksi')->first();
        $count_codes = 1;
        do {
            $codes = '#'.str_pad($transaksi->id_transaksi + 1, 15, $latestOrder->telephone, STR_PAD_LEFT);
            $count_codes = tb_transaksi::where('code_transaksi','=', $codes)->count();
            if ($count_codes == 0) {
                $count_codes--;
            }else{
                $codes = '#'.$latestOrder->telephone.substr(uniqid(rand(), true), 3, 3);
                $count_codes = 1;
            }
            
        } while ($count_codes > 0);
        
    	$data = [
    		'tgl_transkasi' => Carbon::now()->toDateTimeString(),
    		'total_transkasi' => $post['subtotal'],
    		'status_transaksi' => "pembayaran",
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
    public function metode_transaksi(Request $request, $id)
    {
        $id = Crypt::decryptString($id);
        var_dump ($id);
        die();
    }
}
