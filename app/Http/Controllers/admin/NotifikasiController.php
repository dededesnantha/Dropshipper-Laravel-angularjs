<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\produk;
use App\Models\tb_user;

use App\Helpers\Notification;

class NotifikasiController extends Controller
{
    public function push_notif($id_product, Request $request)
    {
    	$post = $request->input();

        $data['user'] = tb_user::select('token_firabase')->get();
        $produk = produk::select('nama_produk')->where('id',$id_product)->first();
        foreach ($data['user'] as $tokens) {
        	if ($tokens->token_firabase != null || $tokens->token_firabase != '') {
                $response = Notification::send([
	                'to' => $tokens->token_firabase,
	                'title' => $post['text'],
                    'click_action' => url(),
	                'body' => $produk['nama_produk'],
	                'icon' => url('images/logobaliya-128.png')
	            ]);
        	}
        }
        return response()->json($response);
    }
}
