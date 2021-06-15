<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;
use Response;
use Cookie;
use DB;
use Illuminate\Support\Facades\Hash;

class ProtectController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
        'username' => 'required|string|max:255',
        'password' => 'required',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $user = User::where('username', $request->username)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                $response = [
                    'token' => $token,
                    'user' => $user->nama];
                return response($response, 200);
            } else {
                $response = ["message" => "Login Gagal"];
                return response($response, 422);
            }
        } else {
            $response = ["message" =>'Login Gagal'];
            return response($response, 422);
        }
    }

    public function all_admin(Request $request)
    {
        $post = $request->input();
        
        if ($post['search'] == NULL) {
            $data = DB::table('tb_admin')
                            ->select('id','nama','username')
                            ->orderBy('id', $post['order'])
                            ->paginate($post['much']);
        }else{
            $data = DB::table('tb_admin')
                            ->select('id','nama','username')
                            ->orderBy('id', $post['order'])
                            ->where('title','like','%'.$post['search'].'%')
                            ->paginate($post['much']);
        }
        return $data;
    }

    public function add_admin(Request $request)
    {
        $validator = Validator::make($request->all(), [
        'nama' => 'required',
        'username' => 'required',
        'password' => 'required',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }else{
            $post = $request->input();
            $count = User::where('username', $post['username'])->count();
            if ($count == 0) {
                User::create([
                    'nama' => $post['nama'],
                    'username' => $post['username'],
                    'password' => Hash::make($post['password']),
                ]);
                $response = ['success' => 'success'];
                return response($response, 200);
            }else{
                $response = ['success' => 'error'];
                return response($response, 500);
            }
        }
    }
    public function admin_rubah($id)
    {
      return User::where('id', $id)->first();
    }
    public function admin_update(Request $request, $id)
    {
      $post = $request->input();

      if (!empty($post['new_password'])) {
        $data = [
          'nama' => $post['nama'] ?? '',
          'username' => $post['username'] ?? '',
          'password' => Hash::make($post['new_password']),
        ];
      }else{
        $data = [
          'nama' => $post['nama'] ?? '',
          'username' => $post['username'] ?? '',
        ];
      }
    User::where('id',$id)->update($data);
    return response()->json(['status'=>'success'],200);
    }
}
