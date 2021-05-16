<?php
use Illuminate\Support\Facades\Route;

// upload image
Route::post('do/upload_gambar/{id}','upload\UploadImage@image_produk');

Route::group(['middleware' => 'auth:api'], function(){
	
	Route::post('add_kategori','admin\AdminController@add_kategori');
	Route::post('all_kategori','admin\AdminController@all_kategori');
	Route::get('get_kategori/{id}','admin\AdminController@get_kategori');
	Route::put('kategori_update/{id}','admin\AdminController@kategori_update');
	Route::delete('kategori/{id}','admin\AdminController@kategori_delete');

	//produk
	Route::get('get_cion','admin\AdminController@get_cion');
	Route::get('get_kategori','admin\AdminController@get_kategori_list');
	Route::post('add_produk','admin\AdminController@add_produk');
	Route::post('all_produk','admin\AdminController@all_produk');
	Route::get('rubah_produk/{id}','admin\AdminController@produk_get');
	Route::put('produk_update/{id}','admin\AdminController@produk_update');
	Route::delete('produk_delete/{id}','admin\AdminController@produk_delete');

	Route::post('all_produk_gambar/{id}','admin\AdminController@all_produk_gambar');
	Route::put('update_gambar_produk/{id}','admin\AdminController@update_gambar_produk');
	Route::delete('delete_gambar/{id}','admin\AdminController@delete_gambar');
	Route::post('update_revisi/{id}','admin\AdminController@update_revisi');
	Route::get('get_revisi/{id}','admin\AdminController@get_revisi');

	// color
	Route::post('add_color','admin\AdminController@add_color');
	Route::get('get_color','admin\AdminController@get_color');
	Route::delete('color_delete/{id}','admin\AdminController@color_delete');

	// size
	Route::post('add_size','admin\AdminController@add_size');
	Route::get('get_size','admin\AdminController@get_size');
	Route::delete('size_delete/{id}','admin\AdminController@size_delete');
	
	// provinsi
	Route::post('add_provinsi','admin\AdminController@add_provinsi');
	Route::post('all_provinsi','admin\AdminController@all_provinsi');
	Route::delete('provinsi_delete/{id}','admin\AdminController@provinsi_delete');
	Route::get('get_provinsi','admin\AdminController@get_provinsi_all');


	Route::get('get_provinsi/{id}','admin\AdminController@get_provinsi');
	
	// kabupaten
	Route::post('all_kabupaten/{id}','admin\AdminController@all_kabupaten');
	Route::post('add_kabupaten/{id}','admin\AdminController@add_kabupaten');
	Route::post('kabupaten_delete/{id}','admin\AdminController@kabupaten_delete');
	Route::get('get_kabupaten_list/{id}','admin\AdminController@get_kabupaten_list');
	

	Route::get('get_kabupaten/{id}','admin\AdminController@get_kabupaten');

	// kecamatan
	Route::post('all_kecamatan/{id}','admin\AdminController@all_kecamatan');
	Route::post('add_kecamatan/{id}','admin\AdminController@add_kecamatan');
	Route::post('kecamatan_delete/{id}','admin\AdminController@kecamatan_delete');
	Route::get('get_kecamatan/{id_kurir}/{id}','admin\AdminController@get_kecamatan');
	Route::get('get_kecamatan_list/{id}','admin\AdminController@get_kecamatan_list');
	

	// kurir
	Route::post('add_kurir','admin\AdminController@add_kurir');
	Route::post('all_kurir','admin\AdminController@all_kurir');
	Route::get('get_kurir/{id}','admin\AdminController@get_kurir');
	Route::post('update_kurir/{id}','admin\AdminController@update_kurir');
	
	// ongkir
	Route::post('add_ongkir','admin\AdminController@add_ongkir');
	Route::post('update_ongkir/{id}','admin\AdminController@update_ongkir');
	Route::delete('delete_ongkir/{id}','admin\AdminController@delete_ongkir');
	
	// user
	Route::post('add_user','admin\UserController@add_user');
	Route::post('get_user','admin\UserController@get_user');
	Route::get('rubah_user/{id}','admin\UserController@rubah_user');
	Route::post('update_user/{id}','admin\UserController@update_user');
	Route::delete('user_delete/{id}','admin\UserController@delete_user');

	// slider
	Route::post('slider_add','admin\AdminController@slider_add');
	Route::post('all_slider','admin\AdminController@all_slider');
	Route::get('get_slider/{id}','admin\AdminController@get_slider');
	Route::put('update_slider/{id}','admin\AdminController@update_slider');
	Route::get('move_up_slider/{id}','admin\AdminController@move_up_slider');
	Route::get('move_down_slider/{id}','admin\AdminController@move_down_slider');
	Route::delete('slider_delete/{id}','admin\AdminController@slider_delete');


	// profile
	Route::get('get_profile','admin\AdminController@get_profile');
	Route::post('profile_update/{id}','admin\AdminController@profile_update');
	Route::get('profile_get_text/{id}','admin\AdminController@profile_get_text');
	Route::post('profile_update_text/{id}','admin\AdminController@profile_update_text');
	
	// transaksi
	
	Route::get('count_transaksi','admin\AdminController@count_transaksi');
	Route::post('pembayaran','admin\AdminController@list_pembayaran');
	Route::post('order','admin\AdminController@list_proses');
	Route::post('dikirim','admin\AdminController@list_dikirim');
	Route::post('diterima','admin\AdminController@list_diterima');
	Route::get('get_transaksi/{id}','admin\AdminController@get_transaksi');
	Route::post('update_transaksi/{id}','admin\AdminController@update_transaksi');

	// admin
	Route::post('all_administrator','admin\ProtectController@all_admin');
	Route::post('admin/add','admin\ProtectController@add_admin');
	Route::get('get_akses/{id}','admin\ProtectController@get_akses');
	Route::post('update_hakases/{id}','admin\ProtectController@update_hakases');
	Route::get('admin_rubah/{id}','admin\ProtectController@admin_rubah');
	Route::put('admin_update/{id}','admin\ProtectController@admin_update');
	Route::delete('admin_delete/{id}','admin\ProtectController@admin_delete');
	
});

