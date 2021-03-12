<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;
use Response;
use Cookie;
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

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255',
        'password' => 'required|string',
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $request['password']=Hash::make($request['password']);
        $user = User::create($request->toArray());
        $response = ['success' => 'success'];
        return response($response, 200);
    }
}
