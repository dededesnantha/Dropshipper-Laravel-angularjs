<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('upload/gambar', 'upload\UploadImgae@index');


// Example Routes
// Route::get('dashboard', 'admin\controllerAdmin@index');
Route::get('dashboard', function(){
	return view('admin.dashboard');
});
Route::view('/', 'landing');
Route::match(['get', 'post'], '/login');
Route::view('/pages/slick', 'pages.slick');
Route::view('/pages/datatables', 'pages.datatables');
Route::view('/pages/blank', 'pages.blank');
Auth::routes();



// upload image
Route::post('upload/slider','admin\AdminController@upload');



// Route::get('session', 'admin\ProtectController@refresh');