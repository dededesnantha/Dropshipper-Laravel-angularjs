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
Route::match(['get', 'post'], '/login');
Route::view('/pages/slick', 'pages.slick');
Route::view('/pages/datatables', 'pages.datatables');
Route::view('/pages/blank', 'pages.blank');
Auth::routes();

// Front-End
Route::get('/','UserDropshipperController@login');

// get user
Route::post('user','UserDropshipperController@get_user');
Route::post('update_profile','UserDropshipperController@update_user');

// area
Route::get('provinsi','AreaContoller@provinsi');
Route::get('kabupaten/{id}','AreaContoller@kabupaten');
Route::get('kecamatan/{id}','AreaContoller@kecamatan');

// slider
Route::get('get_slider','HomeController@slider');

// kategori
Route::get('get_kategori','HomeController@get_kategori');
Route::get('get_kategori_produk/{slug}','HomeController@get_kategori_produk');
Route::get('kategori_all','HomeController@kategori_all');

// produk
Route::get('get_top_produk','HomeController@get_top_produk');
Route::get('get_produk','HomeController@get_produk');
Route::get('produk/{slug}','HomeController@single_produk');
Route::get('produk_top','HomeController@produk_top_all');
Route::get('produk_all','HomeController@produk_all');
Route::get('ongkos_kirim/all','AreaContoller@ongkos_kirim_all');
Route::post('ongkos_kirim/kurir/{id}','AreaContoller@kurir');

// serach
Route::get('search/{slug}','HomeController@search');

// chart
Route::get('card_produk/{id}','HomeController@card_produk');
Route::post('add_cart','CartController@add_cart');
Route::post('get_cart','CartController@get_cart');
Route::post('delete_cart','CartController@delete_cart');
Route::post('update_cart','CartController@update_cart');
Route::post('get_alamat','UserDropshipperController@get_alamat');
Route::put('update_alamat','UserDropshipperController@update_alamat');
Route::post('get_ongkir','HomeController@get_ongkir');

// transaksi
Route::post('add_transaksi','TransaksiController@add_transaksi');
Route::put('metode/{id}','TransaksiController@metode_transaksi');
Route::get('get/count','CartController@count_cart');
Route::get('payment/{id}','TransaksiController@payment_get');
Route::post('transaction/{id}','TransaksiController@transaction_end');
Route::get('get/transaction/{id}','TransaksiController@transaction_get');
Route::get('detail/transaksi/{id}','TransaksiController@detail_transaksi');
Route::put('update_transaksi','TransaksiController@update_transaksi');

Route::get('order/{id}','TransaksiController@redirct_email');
Route::get('pesanan_diterima/{id}','TransaksiController@redirct_success');


// to email
Route::get('to_email','HomeController@redirct_email');
// to sucess
Route::get('to_update_transaksi','TransaksiController@to_update_transaksi');


// tracking
Route::get('detail/list/tracking/{id}','TrackingController@get');
Route::get('detail/list/tracking/transaksi/{id}','TrackingController@get_tracking');
Route::get('detail/list/tracking/success/{id}','TrackingController@get_success');

Route::get('get/count/track','UserDropshipperController@count_track');
// upload gambar
Route::post('upload/gambar','upload\UploadImage@image_user');
// upload image
Route::post('upload/slider','admin\AdminController@upload');
// upload transaksi 
Route::post('upload/transaksi','upload\UploadImage@transaksi');

// OTP
Route::post('change_email','UserDropshipperController@change_email'); 
Route::post('cek_otp','UserDropshipperController@cek_otp');
Route::post('cek_status','UserDropshipperController@cek_status');
Route::post('send_otp/{id}','UserDropshipperController@send_otp');
Route::post('send_rubah_password/{id}','UserDropshipperController@send_rubah_password');
 
// token firabase
Route::put('update_token_firabase','UserDropshipperController@update_token_firabase'); 


// Route::get('session', 'admin\ProtectController@refresh');