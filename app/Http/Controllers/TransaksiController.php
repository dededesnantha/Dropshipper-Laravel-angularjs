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
        $codes = '#'.str_pad($transaksi->id_transaksi + 1, 15, $latestOrder->telephone, STR_PAD_LEFT);
        
    	$data = [
    		'tgl_transkasi' => Carbon::now()->toDateTimeString(),
    		'total_transkasi' => $post['subtotal'],
    		'status_transaksi' => "pembayaran",
    		'id_ongkir' => $post['ongkirs'],
            'code_transaksi' => $codes
    	];
    	$id = tb_transaksi::create($data)->id;
    	$id_orders = explode(',', $post['id_orders']);
    	tb_order::whereIn('id_order', $id_orders)
    	->update([
    		'id_transaksi' => $id
    	]);
        $encrypted = Crypt::encryptString($id);
    	return response()->json($encrypted,200);
    }

    public function metode_transaksi(Request $request, $id)
    {
        $id = Crypt::decryptString($id);
        var_dump ($id);
        die();
    }
}
