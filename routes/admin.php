<?php
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function(){
   	// Route::get('session', function(){            
    //         return response()->json(['success' => true], 200);            
    // });
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
	

	//Packet
	Route::post('add_list_packet','admin\AdminController@add_packet');
	Route::get('get_list_packet','admin\AdminController@get_packet');
	Route::get('get_list_packet_produk','admin\AdminController@get_produk_packet');
	Route::post('add_list_packet_produk','admin\AdminController@add_packet_list');
	Route::delete('list_packet_produk/{id}','admin\AdminController@list_packet_produk_delete');
	Route::get('move_up_list/{id}','admin\AdminController@move_up');
	Route::get('move_down_list/{id}','admin\AdminController@move_down');
	Route::post('update_packet_list/{id}','admin\AdminController@update_packet_list');
	Route::post('delete_packet_list','admin\AdminController@delete_packet_list');

	// slider
	Route::post('slider_add','admin\AdminController@slider_add');
	Route::post('all_slider','admin\AdminController@all_slider');
	Route::get('get_slider/{id}','admin\AdminController@get_slider');
	Route::put('update_slider/{id}','admin\AdminController@update_slider');
	Route::get('move_up_slider/{id}','admin\AdminController@move_up_slider');
	Route::get('move_down_slider/{id}','admin\AdminController@move_down_slider');
	Route::delete('slider_delete/{id}','admin\AdminController@slider_delete');

	// testimoni
	Route::post('add_client','admin\AdminController@add_client');
	Route::post('all_testi','admin\AdminController@all_testi');
	Route::get('rubah_testimoni/{id}','admin\AdminController@rubah_testimoni');
	Route::put('testi_update/{id}','admin\AdminController@testi_update');
	Route::delete('testi_delete/{id}','admin\AdminController@testi_delete');
	Route::post('client_add','admin\AdminController@client_add');
	Route::post('client_semua','admin\AdminController@client_semua');
	Route::get('get_client_id/{id}','admin\AdminController@get_client_id');
	Route::put('update_client_id/{id}','admin\AdminController@update_client_id');
	Route::delete('client_delete/{id}','admin\AdminController@client_delete');
	

	// menu
	Route::get('get_list_menu','admin\AdminController@get_list_menu');
	Route::post('add_menu','admin\AdminController@add_menu');
	Route::post('add_menu_custom','admin\AdminController@add_menu_custom');
	Route::get('get_sub/{id}','admin\AdminController@get_sub');
	Route::post('update_sub/{id}','admin\AdminController@update_sub');
	Route::post('update_menu_custom/{id}','admin\AdminController@update_menu_custom');	
	Route::get('move_up_menu/{id}','admin\AdminController@move_up_menu');
	Route::get('move_down_menu/{id}','admin\AdminController@move_down_menu');
	Route::post('hapus_menu','admin\AdminController@hapus_menu');	

	// sosial MEdia
	Route::post('add_sosial','admin\AdminController@add_sosial');
	Route::post('all_sosialmedia','admin\AdminController@all_sosialmedia');
	Route::get('sosial_produk/{id}','admin\AdminController@sosial_produk');
	Route::put('sosial_update/{id}','admin\AdminController@sosial_update');
	Route::delete('sosial_delete/{id}','admin\AdminController@sosial_delete');

	// setting home
	Route::get('get_list_page','admin\AdminController@get_list_page');
	Route::post('add_page','admin\AdminController@add_page');
	Route::get('get_produk','admin\AdminController@get_produk');
	Route::post('add_fitur','admin\AdminController@add_fitur_home');
	Route::delete('fitur_menu_delete/{id}','admin\AdminController@fitur_menu_delete');
	Route::put('update_packet_page/{id}','admin\AdminController@update_packet_page');
	Route::post('delete_home_setting','admin\AdminController@delete_home_setting');

	// profile
	Route::get('get_profile','admin\AdminController@get_profile');
	Route::post('profile_update/{id}','admin\AdminController@profile_update');
	Route::get('profile_get_text/{id}','admin\AdminController@profile_get_text');
	Route::post('profile_update_text/{id}','admin\AdminController@profile_update_text');

	// team
	Route::post('add_team','admin\AdminController@add_team');
	Route::get('all_team','admin\AdminController@all_team');
	Route::get('rubah_team/{id}','admin\AdminController@rubah_team');
	Route::put('team_update/{id}','admin\AdminController@team_update');
	Route::delete('team_delete/{id}','admin\AdminController@team_delete');

	// pertanyaan
	Route::post('add_pertanyaan','admin\AdminController@add_pertanyaan');
	Route::post('all_pertanyaan','admin\AdminController@all_pertanyaan');
	Route::get('rubah_team/{id}','admin\AdminController@rubah_team');
	Route::get('rubah_pertanyaan/{id}','admin\AdminController@rubah_pertanyaan');
	Route::put('pertanyaan_update/{id}','admin\AdminController@pertanyaan_update');
	Route::delete('pertanyaan_delete/{id}','admin\AdminController@pertanyaan_delete');
	
	
	
	
	
});

