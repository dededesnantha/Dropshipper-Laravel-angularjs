<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\tb_user;
use Validator;
use Response;
use Cookie;
use Illuminate\Support\Facades\Hash;

class UserDropshipperController extends Controller
{
    public function login()
    {	
    	return view('login');
    }

    public function login_send(Request $request)
    {
    	$post = $request->input();
    	$validator = Validator::make($request->all(), [
        'username' => 'required|string|max:255',
        'password' => 'required',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $user = tb_user::where('username', $request->username)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $set_Cookie = Cookie::forever('username', $request->username);
                return response()->json(200)->withCookie($set_Cookie);
            } else {
                $response = ["message" => "Login Gagal"];
                return response($response, 422);
            }
        } else {
            return Response::json($user, 500);
        }
    }

    public function session_user()
    {
    	$datass = Cookie::get('username');
        $get_user = tb_user::select('nama','foto_user','username')->where('username', $datass)->first();
    	if ($datass) {
    		return $get_user;
    	}else{
    		return response()->json($datass, 500);
    	}
    }

    public function logout(Request $request)
    {
        $post = $request->input();
        $get_user = tb_user::where('username', $post['username'])->count();
        if ($get_user > 0) {
            $cookie = Cookie::forget('username');
            return response()->json(200)->withCookie($cookie);
        }else{
            return Response::json($get_user, 500);
        }
    }

    public function get_user(Request $request)
    {
        $post = $request->input();
        return tb_user::select('username','nama','email','foto_user','id_kecamatan','id_provinsi','id_kabupaten','telephone','address')->where('username', $post['username'])->first();
    }
}
