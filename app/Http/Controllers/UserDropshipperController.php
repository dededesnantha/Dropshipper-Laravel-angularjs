<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\tb_user;
use App\Models\tb_order;

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
                $set_Cookie = Cookie::forever('id_user', $user->id_user);
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
    	$datass = Cookie::get('id_user');
        $get_user = tb_user::select('id_user','nama','foto_user','username')->where('id_user', $datass)->first();
        $get_user['cart'] = tb_order::where('id_user', $get_user->id_user)->whereNull('deleted_at')->count();
    	if ($datass) {
    		return $get_user;
    	}else{
    		return response()->json($datass, 500);
    	}
    }

    public function logout(Request $request)
    {
        $post = $request->input();
        $get_user = tb_user::where('id_user', $post['id_user'])->count();
        if ($get_user > 0) {
            $cookie = Cookie::forget('id_user');
            return response()->json(200)->withCookie($cookie);
        }else{
            return Response::json($get_user, 500);
        }
    }

    public function get_user(Request $request)
    {
        $post = $request->input();
        return tb_user::leftJoin('tb_provinsi', 'tb_user.id_provinsi', '=','tb_provinsi.id_provinsi')
                ->select('username','nama','email','foto_user','tb_user.id_kecamatan','tb_user.id_provinsi','tb_user.id_kabupaten','telephone','address','provinsi','kabupaten','kecamatan')->where('id_user', $post['id_user'])
                ->leftJoin('tb_kecamatan', 'tb_user.id_kecamatan', '=','tb_kecamatan.id_kecamatan')
                ->leftJoin('tb_kabupaten', 'tb_user.id_kabupaten', '=', 'tb_kabupaten.id_kabupaten')->first();
    }

    public function update_user(Request $request)
    {
        $post = $request->input();
        
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required',
            'telephone' => 'required',
            'id_provinsi' => 'required',
            'id_kabupaten' => 'required',
            'id_kecamatan' => 'required',
            'address' => 'required',
        ]);
        if ($validator->fails()){
                return response(['errors'=>$validator->errors()->all()], 422);
        }else{
            if ($post['foto_user']['data'] !== NULL) {
                $data = [
                'nama' => $post['nama'],
                'username' => $post['username'],
                'email' => $post['email'],
                'telephone' => $post['telephone']?? '',
                'foto_user' => $post['foto_user']['data'],
                'id_provinsi' => $post['id_provinsi'],
                'id_kabupaten' => $post['id_kabupaten'],
                'id_kecamatan' => $post['id_kecamatan'],
                'address' => $post['address'] ?? ''
                ];
                }else{
                    $data = [
                        'nama' => $post['nama'],
                        'username' => $post['username'],
                        'email' => $post['email'],
                        'telephone' => $post['telephone'] ?? '',
                        'id_provinsi' => $post['id_provinsi'],
                        'id_kabupaten' => $post['id_kabupaten'],
                        'id_kecamatan' => $post['id_kecamatan'],
                        'address' => $post['address'] ?? ''
                    ];
                }
            tb_user::where('id_user', $post['id_user'])->update($data);
            return response(200);
            }
    }
    public function get_alamat(Request $request)
    {
        $post = $request->input();
        $data = tb_user::leftJoin('tb_provinsi', 'tb_user.id_provinsi', '=','tb_provinsi.id_provinsi')
                ->select('tb_user.nama','tb_user.id_kecamatan','tb_user.id_provinsi','tb_user.id_kabupaten','tb_user.telephone','tb_user.address','provinsi','kabupaten','kecamatan')
                ->where('id_user', $post[0])
                ->leftJoin('tb_kecamatan', 'tb_user.id_kecamatan', '=','tb_kecamatan.id_kecamatan')
                ->leftJoin('tb_kabupaten', 'tb_user.id_kabupaten', '=', 'tb_kabupaten.id_kabupaten')->first();
        return Response::json($data, 200);
    } 

    public function update_alamat(Request $request)
    {
        $post = $request->input();
        $data = [
            'nama' => $post['nama'],
            'telephone' => $post['telephone'],
            'id_provinsi' => $post['id_provinsi'],
            'id_kabupaten' => $post['id_kabupaten'],
            'id_kecamatan' => $post['id_kecamatan'],
            'address' => $post['address']
        ];
        tb_user::where('id_user',$post['id_user'])->update($data);
        return Response::json(200);
    }
}
