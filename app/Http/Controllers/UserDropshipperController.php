<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\tb_user;
use App\Models\tb_order;
use App\Models\tb_transaksi;
use App\Models\profile_web;


use Validator;
use Response;
use Cookie;
use Mail;
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
                // $set_Cookie = Cookie::forever('id_user', $user->id_user);
                return response()->json(200)->withCookie(Cookie::forever('id_user', $user->id_user));
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
        $get_user = tb_user::select('id_user','nama','foto_user','username','telephone','id_provinsi','id_kabupaten','id_kecamatan','address','token_firabase')->where('id_user', $datass)->first();
        
    	if ($datass) {
            $get_user['count_track'] = tb_transaksi::where('id_user', $datass)->whereNotNull('status_transaksi')
                    ->whereNotNull('metode_transaksi')
                    ->whereNotNull('tgl_transkasi')
                    ->orderBy('id_transaksi','DESC')
                    ->where(function ($transaksi) {
                            $transaksi->where('tgl_expired', '>=', date('Y-m-d'))
                            ->orWhereNull('tgl_expired');
                        }
                    );
        $get_user['count_track'] = $get_user['count_track']->count();
        $get_user['profile_web'] = $this->profile_web();
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

    public function profile_web()
    {
        $data = profile_web::select('id','nama','no_tlp','email','logo','address','deskripsi')->first();
        if(substr(trim($data->no_tlp), 0, 1)=='0'){
             $data->no_tlp_convert = '62'.substr(trim($data->no_tlp), 1);
         }
        return $data;
    }

    public function change_email(Request $request)
    {
        $post = $request->input();
        $data_user = tb_user::where('email', $post['email'])->first();
        if ($data_user == null) {
            return response()->json(['status' => 'error'], 500);   
        }else{
            $otp = rand(1000, 9999);
            $request->session()->push('otp', $otp);
            $details = [
                'otp' => $otp, 
                'email' => $data_user->email,
                'nama' => $data_user->nama,
                'profile_web' => $this->profile_web(),
            ];
            \Mail::to($data_user->email)->send(new \App\Mail\MailSendOTP($details));
            return Response::json(200);
        }
    }

    public function cek_otp(Request $request)
    {
        if ($request->session()->has('otp')) {
            return Response::json(200);
        }else{
            return response()->json(['status' => 'error'], 500); 
        }
    }
    public function cek_status(Request $request)
    {
        if ($request->session()->has('register')) {
            return Response::json(200);
        }else{
            return response()->json(['status' => 'error'], 500); 
        }
    }
    public function send_otp($id, Request $request)
    {
        $post = $request->input();
        $marge = implode("",$post);
        $token = $request->session()->get('otp');
        $status = false;
        foreach ($token as $datass) {
            if ($datass == $marge) {
                $status = true;
                $request->session()->forget('otp');
                $request->session()->push('register', 'success');
            }
        }
        if ($status) {
            return Response::json(200);
        }else{
          return response()->json(['status' => 'error'], 500);  
        }   
    }

    public function send_rubah_password($id, Request $request)
    {
        $post = $request->input();
        $data_user = tb_user::where('id_user', $id)->first();
        if ($data_user) {
            if (Hash::check($post['old_password'], $data_user->password)) {
                tb_user::where('id_user', $id)->update([
                    'password' => bcrypt($post['new_password'])
                ]);
                $request->session()->forget('register');
            } else {
                $response = ["message" => "Update Gagal"];
                return response($response, 422);
            }
        }else{
            return response()->json(['status' => 'error'], 500);
        }
    }

    public function update_token_firabase(Request $request)
    {
        $post = $request->input();
        tb_user::where('id_user', $post['id_user'])->update([
            'token_firabase' => $post['tokens'] ?? NULL
        ]);
        return response()->json(['status' => 'success'], 200); 
    }
}
