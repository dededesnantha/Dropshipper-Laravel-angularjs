<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'admin\ProtectController@login');
Route::group(['middleware' => 'auth:api'], function(){
   	Route::get('session', function(){            
            return response()->json(['success' => true], 200);            
    });
});

Route::post('login_user', 'UserDropshipperController@login_send');
Route::post('logout', 'UserDropshipperController@logout');

Route::get('session_user', 'UserDropshipperController@session_user');

