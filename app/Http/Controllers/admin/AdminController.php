<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\kategori;
use App\Models\produk;
use App\Models\kategori_packet;
use App\Models\list_packet;
use App\Models\slider;
use App\Models\testimoni;
use App\Models\menu;
use App\Models\sub_menu;
use App\Models\sosial_media;
use App\Models\client;
use App\Models\home_setting;
use App\Models\home_setting_fitur;
use App\Models\profile_web;
use App\Models\profile_team;
use App\Models\list_pertanyaan;
use App\Models\Color;
use App\Models\Size;


use DB;
use File;
use Storage;

class AdminController extends Controller
{
    public function add_kategori(Request $request)
    {
    	$post = $request->input();
        if (empty($post['gambar'])) {
            $post['gambar'] = '';
        }

    	$title_slug = strip_tags($post['title']);        
        $string_replace = array('\'', ';', '[', ']', '{', '}', '|', '^', '~','?','/','.');
        $slug = str_replace(' ','-',str_replace($string_replace, '', $title_slug)); 
        $tc = DB::table('tb_kategori')->where('title', $post['title'])->get();                                    
        if (count($tc) > 0 ) {                 
            $slugs = $slug.'-'.count($tc);            
            $sc = DB::table('tb_kategori')->where('slug', $tc[0]->slug)->count();                
            if ($sc > 0) {
                $finisslug = $slugs.'-'.$sc;
            }else{
                $finisslug = $slug.'-'.count($tc);
            }            
        }else{
          $finisslug = $slug;  
        }
        return kategori::create(array_merge($post, ['slug' => strtolower($finisslug)]));
    }
    
    public function all_kategori(Request $request)
    {
        $post = $request->input();
        
        if ($post['search'] == NULL) {
            $data = DB::table('tb_kategori')
                            ->select('id','title','deskripsi','status')
                            ->orderBy('id', $post['order'])
                            ->paginate($post['much']);
          
        }else{
            $data = DB::table('tb_kategori')
                            ->select('id','title','deskripsi','status')
                            ->orderBy('id', $post['order'])
                            ->where('title','like','%'.$post['search'].'%')
                            ->paginate($post['much']);

        }
        return $data;
    }

    public function get_kategori($id='')
    {
        return kategori::find($id);
    }

    public function kategori_update(Request $request, $id)
    {
        $post = $request->input();

        if (empty($post['gambar'])) {
            $post['gambar'] = '';
        }
            $title_slug = strip_tags($post['title']);        
            $string_replace = array('\'', ';', '[', ']', '{', '}', '|', '^', '~','?','/','.');
            $slug = str_replace(' ','-',str_replace($string_replace, '', $title_slug)); 
            $tc = DB::table('tb_kategori')->where('title', $post['title'])->get();                                    
            if (count($tc) > 0 ) {                 
                $slugs = $slug.'-'.count($tc);            
                $sc = DB::table('tb_kategori')->where('slug', $tc[0]->slug)->count();                
                if ($sc > 0) {
                    $finisslug = $slugs.'-'.$sc;
                }else{
                    $finisslug = $slug.'-'.count($tc);
                }            
            }else{
              $finisslug = $slug;  
            }
        return DB::table('tb_kategori')
                    ->where('id',$id)
                    ->update([
                        'title'=> $post['title'],
                        'deskripsi' => $post['deskripsi'],
                        'gambar' => $post['gambar'],
                        'status'=> $post['status'],
                        'slug' => $finisslug
                    ]);
    }

    public function kategori_delete($id)
    {
        return kategori::where('id',$id)->delete();
    }

    // produk
    public function get_cion()
    {
        $images = \File::allFiles(public_path('icon'));
        $data['icon'] = array();
        foreach ($images as $key => $value) {
            $data['icon'][] = [
                'icon' => $value->getFilename()
            ];
        }
     return $data;   
    }

    public function get_kategori_list()
    {
        $data = kategori::where('status', 1)->get();
        return $data;
    }    

    public function add_produk(Request $request)
    {
        $post = $request->input();
        $post['gambar'] = '';

        // size
        $list_size = [];
        foreach ($post['size'] as $key => $value) {
            if ($value) {
                $get_size = Size::where('id',$key)->select('id','size')->first();
                $list_size[] = $get_size->size;
            }
        }
        $post['size'] = implode(', ', $list_size);
        
        // color
        $list_color = [];
        foreach ($post['warna'] as $key => $value) {
            if ($value) {
                $get_size = Color::where('id',$key)->select('id','text')->first();
                $list_color[] = $get_size->text;
            }
        }
        $post['warna'] = implode(', ', $list_color);
        
        $title_slug = strip_tags($post['nama_produk']);        
        $string_replace = array('\'', ';', '[', ']', '{', '}', '|', '^', '~','?','/','.');
        $slug = str_replace(' ','-',str_replace($string_replace, '', $title_slug)); 
        $tc = DB::table('tb_produk')->where('nama_produk', $post['nama_produk'])->get();                                    
        if (count($tc) > 0 ) {                 
            $slugs = $slug.'-'.count($tc);            
            $sc = DB::table('tb_produk')->where('slug', $tc[0]->slug)->count();                
            if ($sc > 0) {
                $finisslug = $slugs.'-'.$sc;
            }else{
                $finisslug = $slug.'-'.count($tc);
            }            
        }else{
          $finisslug = $slug;  
        }
        return produk::create(array_merge($post, ['slug' => strtolower($finisslug)]));
        
    }

    public function all_produk(Request $request)
    {
        $post = $request->input();
        
        if ($post['search'] == NULL) {
            $data = DB::table('tb_produk')
                            ->join('tb_kategori', 'tb_produk.id_kategori', 'tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.deskripsi','tb_produk.gambar','tb_produk.status','tb_produk.stok','tb_produk.harga','tb_kategori.title as name_kategori')
                            ->orderBy('tb_produk.id',$post['order'])
                            ->paginate($post['much']);
          
        }else if ($post['field_search'] == 'tb_produk.nama_produk' || $post['field_search'] == 'tb_kategori.title') {
            $data = DB::table('tb_produk')
                            ->join('tb_kategori', 'tb_produk.id_kategori', 'tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.deskripsi','tb_produk.gambar','tb_produk.status','tb_produk.stok','tb_produk.harga','tb_kategori.title as name_kategori')
                            ->orderBy('tb_produk.id',$post['order'])
                            ->where($post['field_search'],'like','%'.$post['search'].'%')
                            ->paginate($post['much']);
        }else if ($post['field_search'] == 'tb_produk.stok'){
            $data = DB::table('tb_produk')
                            ->join('tb_kategori', 'tb_produk.id_kategori', 'tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.deskripsi','tb_produk.gambar','tb_produk.status','tb_produk.stok','tb_produk.harga','tb_kategori.title as name_kategori')
                            ->orderBy('tb_produk.id',$post['order'])
                            ->where($post['field_search'],$post['search'])
                            ->paginate($post['much']);
        }else{
            $data = DB::table('tb_produk')
                            ->join('tb_kategori', 'tb_produk.id_kategori', 'tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.deskripsi','tb_produk.gambar','tb_produk.status','tb_produk.stok','tb_produk.harga','tb_kategori.title as name_kategori')
                            ->orderBy('tb_produk.id',$post['order'])
                            ->where($post['field_search'],'>=',$post['search'])
                            ->paginate($post['much']);
        }
        
        return $data;
    }

    public function produk_get($id)
    {
        return produk::find($id);
    }

    public function produk_update(Request $request, $id)
    {
        $post = $request->input();

        if (empty($post['image'])) {
            $post['image'] = '';
        }

        if (empty($post['status_unggulan'])) {
            $post['status_unggulan'] = 0;
        }
        
        if (empty($post['icon'])) {
            $post['icon'] = '';
        }
            $title_slug = strip_tags($post['title']);        
            $string_replace = array('\'', ';', '[', ']', '{', '}', '|', '^', '~','?','/','.');
            $slug = str_replace(' ','-',str_replace($string_replace, '', $title_slug)); 
            $tc = DB::table('produk')->where('title', $post['title'])->get();                                    
            if (count($tc) > 0 ) {                 
                $slugs = $slug.'-'.count($tc);            
                $sc = DB::table('produk')->where('slug', $tc[0]->slug)->count();                
                if ($sc > 0) {
                    $finisslug = $slugs.'-'.$sc;
                }else{
                    $finisslug = $slug.'-'.count($tc);
                }            
            }else{
              $finisslug = $slug;  
            }
        return DB::table('produk')
                    ->where('id',$id)
                    ->update([
                        'title'=> $post['title'],
                        'id_kategori' => $post['id_kategori'],
                        'deskripsi' => $post['deskripsi'],
                        'image' => $post['image'],
                        'status'=> $post['status'],
                        'slug' => $finisslug,
                        'status_unggulan' => $post['status_unggulan'],
                        'harga' => $post['harga'],
                        'icon' => $post['icon']
                    ]);
    }

    public function produk_delete($id)
    {
        return produk::where('id',$id)->delete();
    }

    //packet
    public function add_packet(Request $request)
    {
        $post = $request->input();
        $last_posisi = kategori_packet::orderBy('posisi', 'DESC')->first();
        if (empty($last_posisi)) {
            $post['posisi'] = 1;
        }else{
            $post['posisi'] = $last_posisi->posisi + 1;
        }

        if (empty($post['spesial_text'])) {
            $post['spesial_text'] = ' ';
        }
        kategori_packet::create($post);
        // kategori_packet
    }

    public function get_packet()
    {
        $data = kategori_packet::select('id','title','spesial_text','harga')->orderBy('posisi','ASC')->get();

        foreach ($data as $key => $value) {
            $data[$key]['list_packet'] = list_packet::join('produk','list_packet.id_produk','=','produk.id')
                                        ->select('produk.title','produk.status','produk.harga','list_packet.id_kategori_packet', 'list_packet.id_produk','list_packet.id')
                                        ->where('list_packet.id_kategori_packet',$value->id)
                                        ->orderBy('list_packet.id', 'DESC')
                                        ->get();
        }

        return $data;
    }

    public function get_produk_packet()
    {
         $data = DB::table('produk')->select('id','title','status','harga')->where('status', 1)->orderBy('id','DESC')->get();
        return $data;
    }

    public function add_packet_list(Request $request)
    {
        $post = $request->input();
        
        foreach ($post['list_produksss'] as $key => $value) {
            if ($value) {
                $data = [
                    'id_kategori_packet' => $post['id_kategori'],
                    'id_produk' => $key
                ];

                list_packet::create($data);
            }
        }
    }

    public function list_packet_produk_delete($id)
    {
        return list_packet::find($id)->delete();
    }

    public function move_up($id)
    {
        $posisiup = kategori_packet::find($id);
        $posisidown = kategori_packet::where('posisi',$posisiup->posisi-1)->first();
        
        kategori_packet::find($posisidown->id)->update(array('posisi' => $posisidown->posisi+1 ));
        kategori_packet::find($posisiup->id)->update(array('posisi' => $posisiup->posisi-1 ));
    }

    public function move_down($id)
    {
        $posisidown = kategori_packet::find($id);
        $posisiup = kategori_packet::where('posisi',$posisidown->posisi+1)->first();
        
        kategori_packet::find($posisiup->id)->update(array('posisi' => $posisiup->posisi-1 ));
        kategori_packet::find($posisidown->id)->update(array('posisi' => $posisidown->posisi+1 ));
    }

    public function update_packet_list(Request $request, $id)
    {
        $post = $request->input();
        
        foreach ($post as $key => $rows) {
            if ($rows['id'] == $id){
                if (empty($rows['spesial_text'])) {
                    $rows['spesial_text'] = '';
                }
                $update = ([
                    'title' => $rows['title'],
                    'spesial_text' => $rows['spesial_text'],
                    'harga'=>$rows['harga']
                ]);
            }
        }
        return kategori_packet::where('id',$id)->update($update);
    }

    public function delete_packet_list(Request $request)
    {
        $post = $request->input();

       $list_delete = kategori_packet::where('id', $post['id_kategori'])->first();
       $posisinext = kategori_packet::where('posisi','>',$list_delete->posisi)->get();

       $posisi_last =  $list_delete->posisi;
       foreach ($posisinext as $key => $rows) {
           kategori_packet::where('posisi', $rows['posisi'])->update(array('posisi' => $posisi_last));
           $posisi_last ++;    
       }
       kategori_packet::where('id', $post['id_kategori'])->delete();
       list_packet::where('id_kategori_packet',$post['id_kategori'])->delete();

        return response()->json(['status'=>'deleted'],200);
    }

    // slider
    public function slider_add(Request $request)
    {
        $post = $request->input();

        $last_posisi = slider::orderBy('posisi', 'DESC')->first();
        if (empty($last_posisi)) {
            $data['posisi'] = 1;
        }else{
            $data['posisi'] = $last_posisi->posisi + 1;
        }
        $data['judul'] = '';
        foreach ($post['gambar'] as $key => $value) {
            $data['image'] = $value;
        }
        slider::create($data);
        
    }

    public function all_slider(Request $request)
    {
        $post = $request->input();
        
        if ($post['serach'] == ' ') {
            $data = DB::table('slider')
                            ->orderBy('posisi','ASC')
                            ->paginate(10);
          
        }else{
            $data = DB::table('slider')
                            ->orderBy('posisi','ASC')
                            ->where('judul','like','%'.$post['serach'].'%')
                            ->paginate(10);

        }
        return $data;
    }

    public function get_slider($id)
    {
       return slider::select('id','judul')->where('id',$id)->first();
    }

    public function update_slider(Request $request, $id)
    {
        $post = $request->input();
        slider::where('id',$id)->update([
            'judul' => $post['judul'] 
        ]);

        return response()->json(['status'=>'succes'],200);
    }
    public function move_up_slider($id)
    {
        $posisiup = slider::find($id);
        $posisidown = slider::where('posisi',$posisiup->posisi-1)->first();
        
        slider::find($posisidown->id)->update(array('posisi' => $posisidown->posisi+1 ));
        slider::find($posisiup->id)->update(array('posisi' => $posisiup->posisi-1 ));
    }

    public function move_down_slider($id)
    {
        $posisidown = slider::find($id);
        $posisiup = slider::where('posisi',$posisidown->posisi+1)->first();
        slider::find($posisiup->id)->update(array('posisi' => $posisiup->posisi-1 ));
        slider::find($posisidown->id)->update(array('posisi' => $posisidown->posisi+1 ));
    }

    public function slider_delete($id)
    {

       $list_delete = slider::where('id', $id)->first();
       $posisinext = slider::where('posisi','>',$list_delete->posisi)->get();

       $posisi_last =  $list_delete->posisi;
       foreach ($posisinext as $key => $rows) {
           slider::where('posisi', $rows['posisi'])->update(array('posisi' => $posisi_last));
           $posisi_last ++;    
       }
       slider::where('id', $id)->delete();

        return response()->json(['status'=>'deleted'],200);
    }

    // testimoni
    public function add_client(Request $request)
    {
       $post = $request->input();
       if (empty($post['image'])) {
           $post['image'] = '';
       }
       if (empty($post['date'])) {
           $post['date'] = '';
       }

       testimoni::create($post);
       return response()->json(['status'=>'succes'],200);
       
    }

    public function all_testi(Request $request)
    {
        $post = $request->input();
        
        if ($post['serach'] == ' ') {
            $data = DB::table('testimoni')
                            ->select('id','nama','deskripsi','date')
                            ->orderBy('id','DESC')
                            ->paginate(10);
          
        }else{
            $data = DB::table('testimoni')
                            ->select('id','nama','deskripsi','date')
                            ->orderBy('id','DESC')
                            ->where('nama','like','%'.$post['serach'].'%')
                            ->paginate(10);

        }
        return $data;
    }

    public function rubah_testimoni($id)
    {
        return testimoni::find($id);
    }

    public function testi_update(Request $request, $id)
    {
        $post = $request->input();
        if (empty($post['image'])) {
           $post['image'] = '';
       }
       if (empty($post['date'])) {
           $post['date'] = '';
       }
       $post = ([
        'nama' => $post['nama'],
        'deskripsi' => $post['deskripsi'],
        'image' => $post['image'],
        'date' => $post['date']
       ]);
       return testimoni::where('id',$id)->update($post);
    }

    public function testi_delete($id)
    {
        $data_get = testimoni::find($id)->first();
        if ($data_get->image !='') {

            if(\File::exists(public_path('image/'.$data_get->image))){
                File::delete(public_path('image/'.$data_get->image));
            }
        }
        return testimoni::find($id)->delete();
    }

    public function client_add(Request $request)
    {
        $post = $request->input();
        foreach ($post['gambar'] as $key => $value) {
            $data['image'] = $value;
        }
        $data['judul'] ='';
        $data['link'] = "#";
        client::create($data);
    }

    public function client_semua(Request $request)
    {
        $post = $request->input();
        
        if ($post['serach'] == ' ') {
            $data = DB::table('client')
                            ->orderBy('id','DESC')
                            ->paginate(10);
        }else{
            $data = DB::table('client')
                            ->orderBy('id','DESC')
                            ->where('judul','like','%'.$post['serach'].'%')
                            ->paginate(10);
        }
        return $data;
    }
    public function get_client_id($id)
    {
        return client::select('id','link','judul')->where('id', $id)->first();
    }
    public function update_client_id(Request $request, $id)
    {
        $post = $request->input();
        if ($post['link'] == null) {
            $post['link'] = '';
        }
        return client::where('id',$id)->update($post);
    }
    public function client_delete($id)
    {
        $data_get = client::find($id)->first();
        if ($data_get->image !='') {

            if(\File::exists(public_path('gallery/'.$data_get->image))){
                File::delete(public_path('gallery/'.$data_get->image));
            }
        }
        return client::find($id)->delete();
    }

    // menu
    public function add_menu(Request $request)
    {
        $post = $request->input();
        
        if ($post['status_sub'] == 1 && $post['judul'] == "Fitur Menu") {
                $last_posisi = menu::orderBy('posisi', 'DESC')->first();
                if (empty($last_posisi)) {
                    $post['posisi'] = 1;
                }else{
                    $post['posisi'] = $last_posisi->posisi + 1;
                }
            $id = menu::create($post)->id;
            $sub_menu = array(
                array(
                  'judul' => "4 Fitur Unggulan",
                  'link' => "fitur-unggulan",
                  'status' => 1,
                  'id_menu' => $id
                ),array(
                      'judul' => "Indeks Fitur Lain",
                      'link' => "fitur-lain",
                      'status' => 1,
                      'id_menu' => $id
                )
            );
           return sub_menu::insert($sub_menu);
        } else if ($post['status_sub'] == 1 && $post['judul'] == "Daftar Harga") {
            $last_posisi = menu::orderBy('posisi', 'DESC')->first();
                if (empty($last_posisi)) {
                    $post['posisi'] = 1;
                }else{
                    $post['posisi'] = $last_posisi->posisi + 1;
                }
            $id = menu::create($post)->id;
            $sub_menu = array(
                array(
                  'judul' => "List Paket Harga",
                  'link' => "list-harga",
                  'status' => 1,
                  'id_menu' => $id
                ),array(
                    'judul' => "Simulasi harga",
                    'link' => "simulasi-harga",
                    'status' => 1,
                    'id_menu' => $id
                ),array(
                    'judul' => "Simulasi Penawaran",
                    'link' => "simulasi-penawaran",
                    'status' => 1,
                    'id_menu' => $id
                )
            );
           return sub_menu::insert($sub_menu);
        }else if ($post['status_sub'] == 1 && $post['judul'] == "Bantuan") {
            $last_posisi = menu::orderBy('posisi', 'DESC')->first();
                if (empty($last_posisi)) {
                    $post['posisi'] = 1;
                }else{
                    $post['posisi'] = $last_posisi->posisi + 1;
                }
            $id = menu::create($post)->id;
            $sub_menu = array(
                array(
                  'judul' => "F & Q",
                  'link' => "fq",
                  'status' => 1,
                  'id_menu' => $id
                ),array(
                    'judul' => "Syarat & ketentuan",
                    'link' => "syarat-ketentuan",
                    'status' => 1,
                    'id_menu' => $id
                ),array(
                    'judul' => "Kebijakan Privasi",
                    'link' => "kebijakan-privasi",
                    'status' => 1,
                    'id_menu' => $id
                )
            );
           return sub_menu::insert($sub_menu);
        }else if ($post['status_sub'] == 1 && $post['judul'] == "Lainnya") {
            $last_posisi = menu::orderBy('posisi', 'DESC')->first();
                if (empty($last_posisi)) {
                    $post['posisi'] = 1;
                }else{
                    $post['posisi'] = $last_posisi->posisi + 1;
                }
            $id = menu::create($post)->id;
            $sub_menu = array(
                array(
                  'judul' => "Tentang Kami",
                  'link' => "tentang-kami",
                  'status' => 1,
                  'id_menu' => $id
                ),array(
                    'judul' => "Kontak Kami",
                    'link' => "kontak-kami",
                    'status' => 1,
                    'id_menu' => $id
                )
            );
           return sub_menu::insert($sub_menu);
        }else{
            $last_posisi = menu::orderBy('posisi', 'DESC')->first();
            if (empty($last_posisi)) {
                $post['posisi'] = 1;
            }else{
                $post['posisi'] = $last_posisi->posisi + 1;
            }
           
          return menu::create($post);
        }
    }

    public function add_menu_custom(Request $request)
    {
        $post = $request->input();
        $post['status_sub'] = 0;
        $last_posisi = menu::orderBy('posisi', 'DESC')->first();
            if (empty($last_posisi)) {
                $post['posisi'] = 1;
            }else{
                $post['posisi'] = $last_posisi->posisi + 1;
            }
        return menu::create($post);
    }

    public function get_list_menu($value='')
    {
        $data = menu::select('id','judul','link','status_sub','posisi')->orderBy('posisi','ASC')->get();

        foreach ($data as $key => $value) {
            $data[$key]['list_sub'] = sub_menu::select('id','judul','link','id_menu','status')
                                        ->where('id_menu',$value->id)
                                        ->orderBy('id', 'DESC')
                                        ->get();
        }

        return $data;
    }

    public function get_sub($id)
    {
        return sub_menu::where('id',$id)->first();
    }

    public function update_sub(Request $request, $id)
    {
        $post = $request->input();
        if ($post['status'] == false) {
            $post['status'] = 0;
        } else {
            $post['status'] = 1;
        }
        $data = [
            'judul' => $post['judul'],
            'link' => $post['link'],
            'status' => $post['status']
        ];
        return sub_menu::where('id',$id)->update($data);
    }

    public function update_menu_custom(Request $request,$id)
    {
        $post = $request->input();
        foreach ($post as $key => $value) {
            if ($value['id'] == $id) {
                $datas = [
                    'judul' => $value['judul'],
                    'link' => $value['link']
                ];
               return menu::where('id',$id)->update($datas);
            }
            
        }
    }

    public function move_up_menu($id)
    {
        $posisiup = menu::find($id);
        $posisidown = menu::where('posisi',$posisiup->posisi-1)->first();
        
        menu::find($posisidown->id)->update(array('posisi' => $posisidown->posisi+1 ));
        menu::find($posisiup->id)->update(array('posisi' => $posisiup->posisi-1 ));
    }

    public function move_down_menu($id)
    {
        $posisidown = menu::find($id);
        $posisiup = menu::where('posisi',$posisidown->posisi+1)->first();
        
        menu::find($posisiup->id)->update(array('posisi' => $posisiup->posisi-1 ));
        menu::find($posisidown->id)->update(array('posisi' => $posisidown->posisi+1 ));
    }

    public function hapus_menu(Request $request)
    {
        $post = $request->input();
        
        $list_delete = menu::where('id', $post['id_menu'])->first();
        $posisinext = menu::where('posisi','>',$list_delete->posisi)->get();

       $posisi_last =  $list_delete->posisi;
       foreach ($posisinext as $key => $rows) {
            menu::where('posisi', $rows['posisi'])->update(array('posisi' => $posisi_last));
           $posisi_last ++;    
       }
       menu::where('id', $post['id_menu'])->delete();
       sub_menu::where('id_menu',$post['id_menu'])->delete();

    }

    public function add_sosial(Request $request)
    {
        $post = $request->input();
        return sosial_media::create($post);
    }
    public function all_sosialmedia(Request $request)
    {
        $post = $request->input();
        
        if ($post['serach'] == ' ') {
            $data = DB::table('sosial_media')
                            ->orderBy('id','DESC')
                            ->paginate(10);
          
        }else{
            $data = DB::table('sosial_media')
                            ->orderBy('id','DESC')
                            ->where('judul','like','%'.$post['serach'].'%')
                            ->paginate(10);

        }
        return $data;
    }
    public function sosial_produk($id)
    {
        return sosial_media::where('id', $id)->first();
    }
    public function sosial_update(Request $request, $id)
    {
        $post = $request->input();
        $data = [
            'judul' => $post['judul'],
            'link' => $post['link'],
            'image' => $post['image']
        ];
        return sosial_media::where('id',$id)->update($data);
    }
    public function sosial_delete($id)
    {
        $data_get = sosial_media::where('id',$id)->first();
        if ($data_get->image !='') {

            if(\File::exists(public_path('media/icon/'.$data_get->image))){
                File::delete(public_path('media/icon/'.$data_get->image));
            }
        }
        return sosial_media::where('id',$id)->delete();
    }

    // settimg menu
    public function get_produk()
    {
        $data = DB::table('produk')->select('id','title','status','harga')->where('status', 1)->orderBy('id','DESC')->get();
        return $data;
    }
    public function add_fitur_home(Request $request)
    {
        $post = $request->input();
        $get_home = home_setting::where('judul','Profile')->first();
        $data = [
            'id_home' => $get_home->id,
            'id_produk' => $post['id_produk']
        ];
        return home_setting_fitur::create($data);
    }
    public function get_list_page()
    {
        $data = home_setting::orderBy('id','ASC')->get();
        foreach ($data as $key => $value) {
            $data[$key]['list_fitur'] = home_setting_fitur::join('produk', 'home_setting_fitur.id_produk','=','produk.id')
                                        ->select('home_setting_fitur.id','home_setting_fitur.id_home','produk.title')
                                        ->where('home_setting_fitur.id_home',$value->id)
                                        ->orderBy('id', 'DESC')
                                        ->get();
        }

        return $data;
    }
    public function add_page(Request $request)
    {
        $post = $request->input();
        $data = [
            'judul' => $post['judul'],
            'text' => $post['judul'],
            'deskripsi' => ''
        ];
        return home_setting::create($data);
    }
    public function fitur_menu_delete($id)
    {
       return home_setting_fitur::where('id',$id)->delete();
    }
    public function update_packet_page(Request $request, $id)
    {
        $post = $request->input();
        foreach ($post as $key => $value) {
            if ($value['id'] == $id) {
                if (empty($value['deskripsi'])) {
                    $value['deskripsi'] = '';
                }
                $datas = [
                    'text' => $value['text'],
                    'deskripsi' => $value['deskripsi']
                ];
               return home_setting::where('id',$id)->update($datas);
            }
            
        }
    }
    public function delete_home_setting(Request $request)
    {
        $post = $request->input();
        $get_home = home_setting::where('id', $post['id_home'])->where('judul','profile')->first();
        if (empty($get_home)) {
            return home_setting::where('id',$post['id_home'])->delete();
        }else{
            home_setting_fitur::where('id_home',$post['id_home'])->delete();
            return home_setting::where('id',$post['id_home'])->delete();
        }
    }


    // ==== Profile ====== //
    public function get_profile()
    {
         $count = profile_web::all()->count();        
        if ($count == 0) {
            $data = [
            'nama' => '',
            'status_popup_pertanyaan' => 0
            ];
            profile_web::create($data);
        }
        return profile_web::select('id','nama','no_tlp','email','logo','image_profile','address','deskripsi','status_popup_pertanyaan')->first();
    }
    public function profile_update(Request $request, $id)
    {
        $post = $request->input();
        if ($post['status_popup_pertanyaan'] == true) {
            $post['status_popup_pertanyaan'] = 1;
        }else{
            $post['status_popup_pertanyaan'] = 0;
        }
        $post['created_at'] = date('Y-m-d H:i:s');
        $post['updated_at'] = date('Y-m-d H:i:s');
        profile_web::where('id',$id)->update($post);
    }
    public function profile_get_text($id)
    {
         return profile_web::where('id',$id)->select('syarat_ketentuan','kebijakan_privasi','tentang_kami')->first();
    }
    public function profile_update_text(Request $request, $id)
    {
        $post = $request->input();
        profile_web::where('id',$id)->update($post);
    }

    // ================ TEAM
    public function add_team(Request $request)
    {
        $post = $request->input();
        return profile_team::create($post);
    }
    public function all_team()
    {
        $data = profile_team::orderBy('id','DESC')->get();
        return $data;
    }
    public function rubah_team($id)
    {
        return profile_team::find($id);
    }
    public function team_update(Request $request, $id)
    {
        $post = $request->input();
        $data = [
            'nama' => $post['nama'],
            'jabatan' => $post['jabatan'],
            'image' => $post['image']
        ];
       return profile_team::where('id',$id)->update($data);
    }
    public function team_delete($id)
    {
        return profile_team::where('id',$id)->delete();
    }

    // ===========Pertanyaan
    public function add_pertanyaan(Request $request)
    {
        $post = $request->input();
        return list_pertanyaan::create($post);
    }
    public function all_pertanyaan(Request $request)
    {
        $post = $request->input();
        
        if ($post['serach'] == ' ') {
            $data = DB::table('list_pertanyaan')
                            ->orderBy('id','DESC')
                            ->paginate(10);

        }else{
            $data = DB::table('list_pertanyaan')
                            ->orderBy('id','DESC')
                            ->where('judul','like','%'.$post['serach'].'%')
                            ->paginate(10);

        }
        return $data;
    }
    public function rubah_pertanyaan($id)
    {
        return list_pertanyaan::find($id);
    }
    public function pertanyaan_update(Request $request, $id)
    {
        $post = $request->input();
        $data = [
            'judul' => $post['judul'],
            'jawab' => $post['jawab']
        ];
       return list_pertanyaan::where('id',$id)->update($data);
    }
    public function pertanyaan_delete($id)
    {
        return list_pertanyaan::where('id',$id)->delete();
    }
    

    // color
    public function add_color(Request $request)
    {
        $post = $request->input();
        return Color::create($post);
    }
    public function get_color()
    {
        $data = Color::get();
        return $data;
    }
    public function color_delete($id)
    {
        return Color::where('id',$id)->delete();
    }

    // size
    public function add_size(Request $request)
    {
        $post = $request->input();
        return Size::create($post);
    }
    public function get_size()
    {
        $data = Size::get();
        return $data;
    }
    public function size_delete($id)
    {
        return Size::where('id',$id)->delete();
    }
    
}
