<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\tb_transaksi;
use Carbon\Carbon;
use App\Models\tb_order;

class TransaksiController extends Controller
{
    public function add_transaksi(Request $request)
    {
    	$post = $request->input();
    	$data = [
    		'tgl_transkasi' => Carbon::now()->toDateTimeString(),
    		'total_transkasi' => $post['subtotal'],
    		'status_transaksi' => "pembayaran",
    		'id_ongkir' => $post['ongkirs']
    	];
    	$id = tb_transaksi::create($data)->id;
    	$id_orders = explode(',', $post['id_orders']);
    	tb_order::whereIn('id_order', $id_orders)
    	->update([
    		'id_transaksi' => $id
    	]);
    	return response()->json(['status'=>'succes'],200);
    }
}
