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
use App\Models\tb_produk_gambar;
use App\Models\tb_provinsi;
use App\Models\tb_kabupaten;
use App\Models\tb_kecamatan;
use App\Models\tb_kurir;
use App\Models\tb_ongkir;



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
    public function get_kategori_list()
    {
        $data = kategori::where('status', 1)->get();
        return $data;
    }    

    public function add_produk(Request $request)
    {
        $post = $request->input();
        $post['gambar'] = '';

        if (!empty($post['size'])) {
            // size
            $list_size = [];
            foreach ($post['size'] as $key => $value) {
                if ($value) {
                    $get_size = Size::where('id',$key)->select('id','size')->first();
                    $list_size[] = $get_size->size;
                }
            }
            $post['size'] = implode(', ', $list_size);
        }else{
            $post['size'] = '';
        }

        if (!empty($post['warna'])) {
            // color
            $list_color = [];
            foreach ($post['warna'] as $key => $value) {
                if ($value) {
                    $get_size = Color::where('id',$key)->select('id','text')->first();
                    $list_color[] = $get_size->text;
                }
            }
            $post['warna'] = implode(', ', $list_color);
        }else{
            $post['warna'] = '';
        }
        
        
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
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.deskripsi','tb_produk.gambar','tb_produk.status','tb_produk.stok','tb_produk.harga','tb_produk.harga_promo','tb_kategori.title as name_kategori')
                            ->orderBy('tb_produk.id',$post['order'])
                            ->paginate($post['much']);
          
        }else if ($post['field_search'] == 'tb_produk.nama_produk' || $post['field_search'] == 'tb_kategori.title') {
            $data = DB::table('tb_produk')
                            ->join('tb_kategori', 'tb_produk.id_kategori', 'tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.deskripsi','tb_produk.gambar','tb_produk.status','tb_produk.stok','tb_produk.harga','tb_produk.harga_promo','tb_kategori.title as name_kategori')
                            ->orderBy('tb_produk.id',$post['order'])
                            ->where($post['field_search'],'like','%'.$post['search'].'%')
                            ->paginate($post['much']);
        }else if ($post['field_search'] == 'tb_produk.stok'){
            $data = DB::table('tb_produk')
                            ->join('tb_kategori', 'tb_produk.id_kategori', 'tb_kategori.id')
                           ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.deskripsi','tb_produk.gambar','tb_produk.status','tb_produk.stok','tb_produk.harga','tb_produk.harga_promo','tb_kategori.title as name_kategori')
                            ->orderBy('tb_produk.id',$post['order'])
                            ->where($post['field_search'],$post['search'])
                            ->paginate($post['much']);
        }else{
            $data = DB::table('tb_produk')
                            ->join('tb_kategori', 'tb_produk.id_kategori', 'tb_kategori.id')
                            ->select('tb_produk.id','tb_produk.nama_produk','tb_produk.deskripsi','tb_produk.gambar','tb_produk.status','tb_produk.stok','tb_produk.harga','tb_produk.harga_promo','tb_kategori.title as name_kategori')
                            ->orderBy('tb_produk.id',$post['order'])
                            ->where($post['field_search'],'>=',$post['search'])
                            ->paginate($post['much']);
        }
        
        return $data;
    }

    public function produk_get($id)
    {
        $get_produk = produk::find($id);
        if ($get_produk->size !== '') {
            $size = explode(', ', $get_produk->size);
            $get_size = Size::whereIn('size',$size)->select('id','size')->get();
            foreach ($get_size as $key => $values) {
                $datas_size[$values->id] = true;
            }
            $get_produk->size = $datas_size;
        }else{
            $get_produk->size = [];
        }

        if ($get_produk->warna !== '') {
            $warna = explode(', ', $get_produk->warna);
            $get_size = Color::whereIn('text',$warna)->select('id','text')->get();
            foreach ($get_size as $key => $values) {
                $datas_color[$values->id] = true;
            }
            $get_produk->warna = $datas_color;
        }else{
            $get_produk->warna = [];
        }

        return $get_produk;
    }

    public function produk_update(Request $request, $id)
    {
        $post = $request->input();

        if (!empty($post['size'])) {
            // size
            $list_size = [];
            foreach ($post['size'] as $key => $value) {
                if ($value) {
                    $get_size = Size::where('id',$key)->select('id','size')->first();
                    $list_size[] = $get_size->size;
                }
            }
            $post['size'] = implode(', ', $list_size);
        }else{
            $post['size'] = '';
        }

        if (!empty($post['warna'])) {
            // color
            $list_color = [];
            foreach ($post['warna'] as $key => $value) {
                if ($value) {
                    $get_size = Color::where('id',$key)->select('id','text')->first();
                    $list_color[] = $get_size->text;
                }
            }
            $post['warna'] = implode(', ', $list_color);
        }else{
            $post['warna'] = '';
        }

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
        return DB::table('tb_produk')
                    ->where('id',$id)
                    ->update([
                        'nama_produk'=> $post['nama_produk'],
                        'id_kategori' => $post['id_kategori'],
                        'deskripsi' => $post['deskripsi'],
                        'status'=> $post['status'],
                        'slug' => $finisslug,
                        'stok' => $post['stok'],
                        'size' => $post['size'],
                        'warna' => $post['warna'],
                        'harga' => $post['harga']
                    ]);
    }

    public function produk_delete($id)
    {
        $gambar_check = tb_produk_gambar::select('gambar')->where('id_produk',$id)->get();  
        foreach ($gambar_check as $key => $rows) {
            if (file_exists(public_path('image/'.$rows['gambar']))) {
                @unlink(public_path('image/'.$rows['gambar']));
            }        
        }      
        tb_produk_gambar::where('id_produk',$id)->delete();
        return produk::where('id',$id)->delete();
    }

    // produk gambar
    public function all_produk_gambar(Request $request, $id)
    {
        $post = $request->input();
        $data_id = (int)$id;
        $produks = produk::where('id','=',$data_id)->first();
        
        $data = DB::table('tb_produk_gambar')
                            ->select('id','id_produk','gambar')
                            ->where('id_produk', $id)
                            ->orderBy('id',$post['order'])
                            ->paginate($post['much']);
        $data = json_decode( json_encode($data), true);
         
        foreach ($data['data'] as $key => $rows) {
            if ($produks->gambar == $rows['gambar']) {
                $data['data'][$key]['active'] = "true";
            }else{
                $data['data'][$key]['active'] = "false";
            }
        }
        return $data;
    }
    public function update_gambar_produk(Request $request, $id)
    {
        $post = $request->input();
        return DB::table('tb_produk')
                    ->where('id',$id)
                    ->update(['gambar' => $post['gambar']]);
    }
    public function delete_gambar($id)
    {
        $gambar_check = tb_produk_gambar::select('gambar')->where('id',$id)->get();        
        if (file_exists(public_path('image/'.$gambar_check[0]['gambar']))) {
            @unlink(public_path('image/'.$gambar_check[0]['gambar']));
        }        
        return tb_produk_gambar::where('id',$id)->delete();
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
            $data = DB::table('tb_slider')
                            ->orderBy('posisi','ASC')
                            ->paginate(10);
          
        }else{
            $data = DB::table('tb_slider')
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

    // ==== Profile ====== //
    public function get_profile()
    {
         $count = profile_web::all()->count();        
        if ($count == 0) {
            $data = [
            'nama' => '',
            ];
            profile_web::create($data);
        }
        return profile_web::select('id','nama','no_tlp','email','logo','address','deskripsi')->first();
    }
    public function profile_update(Request $request, $id)
    {
        $post = $request->input();
        $post['created_at'] = date('Y-m-d H:i:s');
        $post['updated_at'] = date('Y-m-d H:i:s');
        profile_web::where('id',$id)->update($post);
    }
    public function profile_update_text(Request $request, $id)
    {
        $post = $request->input();
        profile_web::where('id',$id)->update($post);
    }

    // color
    public function add_color(Request $request)
    {
        $post = $request->input();
        $get_color = DB::table('tb_color')->where('text', $post['text'])->count();
        if ($get_color == 0) {
            return Color::create($post);
        }else{
            $data = "data_same";
            return $data;
        }
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
        $get_color = DB::table('tb_size')->where('size', $post['size'])->count();
        if ($get_color == 0) {
            return Size::create($post);
        }else{
            $data = "data_same";
            return $data;
        }
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
    
    public function update_revisi(Request $request, $id)
    {
        $post = $request->input();
        if (empty($post['text_label'])) {
            $post['text_label'] = NULL;
        }
        if (empty($post['jenis_label'])) {
            $post['jenis_label'] = NULL;
        }
        if (empty($post['harga_promo'])) {
            $post['harga_promo'] = NULL;
        }
        return DB::table('tb_produk')
                    ->where('id',$id)
                    ->update($post);
    }
    public function get_revisi($id)
    {
        return produk::where('id',$id)->select('harga_promo','jenis_label','text_label')->first();
    }

    public function add_provinsi(Request $request)
    {
        $post = $request->input();
        if (empty($post['id_provinsi'])) {
            tb_provinsi::create(['provinsi' => $post['provinsi']]);
        }else{
            tb_provinsi::where('id_provinsi', $post['id_provinsi'])->update(['provinsi'=>$post['provinsi']]);
        }

        return true;
    }

    public function all_provinsi(Request $request)
    {
        $post = $request->input();
        
        if ($post['search'] == NULL) {
            $data = DB::table('tb_provinsi')
                            ->select('id_provinsi','provinsi')
                            ->orderBy('id_provinsi',$post['order'])
                            ->paginate($post['much']);
          
        }else if ($post['field_search'] == 'provinsi') {
            $data = DB::table('tb_provinsi')
                            ->select('id_provinsi','provinsi')
                            ->orderBy('id_provinsi',$post['order'])
                            ->where($post['field_search'],'like','%'.$post['search'].'%')
                            ->paginate($post['much']);

        }else{
            $data = DB::table('tb_provinsi')
                            ->select('id_provinsi','provinsi')
                            ->orderBy('id_provinsi',$post['order'])
                            ->where($post['field_search'],'>=',$post['search'])
                            ->paginate($post['much']);
        }
        return $data;
    }
    public function provinsi_delete($id)
    {
        // tb_kabupaten::where('id_provinsi',$id)->delete();
        return tb_provinsi::where('id_provinsi',$id)->delete();
    }

    public function get_provinsi($id)
    {
        return tb_provinsi::where('id_provinsi',$id)->first();
    }

    public function get_provinsi_all()
    {
        return tb_provinsi::select('id_provinsi','provinsi')->get();
    }

    public function all_kabupaten(Request $request, $id)
    {
        $post = $request->input();
        
        if ($post['search'] == NULL) {

            $data = DB::table('tb_kabupaten')
                            ->where('id_provinsi', $id)
                            ->select('id_kabupaten','id_provinsi','kabupaten')
                            ->orderBy('id_kabupaten',$post['order'])
                            ->paginate($post['much']);
          
        }else if ($post['field_search'] == 'kabupaten') {
            $data = DB::table('tb_kabupaten')
                            ->where('id_provinsi', $id)
                            ->select('id_kabupaten','id_provinsi','kabupaten')
                            ->orderBy('id_kabupaten',$post['order'])
                            ->where($post['field_search'],'like','%'.$post['search'].'%')
                            ->paginate($post['much']);

        }else{
            $data = DB::table('tb_kabupaten')
                            ->where('id_provinsi', $id)
                            ->select('id_kabupaten','id_provinsi','kabupaten')
                            ->orderBy('id_kabupaten',$post['order'])
                            ->where($post['field_search'],'>=',$post['search'])
                            ->paginate($post['much']);
        }
        return $data;
    }
    public function add_kabupaten(Request $request, $id)
    {
        $post = $request->input();
        if (empty($post['id_kabupaten'])) {
            tb_kabupaten::create(['kabupaten' => $post['kabupaten'], 'id_provinsi'=> $id]);
        }else{
            tb_kabupaten::where('id_kabupaten', $post['id_kabupaten'])->update(['kabupaten'=>$post['kabupaten'], 'id_provinsi'=> $id]);
        }

        return true;
    }

    public function kabupaten_delete(Request $request, $id)
    {
        $post = $request->input();
        // tb_kecamatan::where('id_kabupaten',$post['id_kabupaten'])->delete();
       return tb_kabupaten::where('id_provinsi',$id)->where('id_kabupaten',$post['id_kabupaten'])->delete();
    }

    public function get_kabupaten_list($id_provinsi)
    {
       return tb_kabupaten::where('id_provinsi',$id_provinsi)->get();
    }
    public function all_kecamatan(Request $request, $id_kabupaten)
    {
        $post = $request->input();
        
        if ($post['search'] == NULL) {

            $data = DB::table('tb_kecamatan')
                            ->where('id_kabupaten', $id_kabupaten)
                            ->select('id_kecamatan','id_kabupaten','kecamatan')
                            ->orderBy('id_kecamatan',$post['order'])
                            ->paginate($post['much']);
          
        }else if ($post['field_search'] == 'kecamatan') {
            $data = DB::table('tb_kecamatan')
                            ->where('id_kabupaten', $id_kabupaten)
                            ->select('id_kecamatan','id_kabupaten','kecamatan')
                            ->orderBy('id_kecamatan',$post['order'])
                            ->where($post['field_search'],'like','%'.$post['search'].'%')
                            ->paginate($post['much']);

        }
        return $data;
    }
    public function add_kecamatan(Request $request, $id)
    {
        $post = $request->input();
        if (empty($post['id_kecamatan'])) {
            tb_kecamatan::create(['kecamatan' => $post['kecamatan'], 'id_kabupaten'=> $id]);
        }else{
            tb_kecamatan::where('id_kecamatan', $post['id_kecamatan'])->update(['kecamatan'=>$post['kecamatan'], 'id_kabupaten'=> $id]);
        }

        return true;
    }

    public function kecamatan_delete(Request $request, $id)
    {
        $post = $request->input();
       return tb_kecamatan::where('id_kabupaten',$id)->where('id_kecamatan',$post['id_kecamatan'])->delete();
    }

    public function get_kecamatan($id_kurir,$id)
    {

        $data = tb_ongkir::join('tb_kecamatan','tb_ongkir.id_kecamatan','=','tb_kecamatan.id_kecamatan') 
                            ->join('tb_kurir','tb_ongkir.id_kurir','=','tb_kurir.id_kurir') 
                            ->select('tb_ongkir.id_ongkir','tb_kecamatan.id_kecamatan','tb_kecamatan.kecamatan','tb_kecamatan.id_kabupaten','tb_ongkir.harga','tb_kurir.judul')
                            ->where('tb_kecamatan.id_kabupaten',$id)
                            ->where('tb_ongkir.id_kurir',$id_kurir)
                            ->get();
        return $data;
    }

     public function get_kecamatan_list($id_kabupaten)
    {
       return tb_kecamatan::where('id_kabupaten',$id_kabupaten)->get();
    }

    public function get_kabupaten($id)
    {
        $data = tb_kabupaten::where('id_kabupaten',$id)->first();
        return $data;
    }

    // kurir
    public function add_kurir(Request $request)
    {
        $post = $request->input();
        return tb_kurir::create($post);
    }

    public function all_kurir(Request $request)
    {
        $post = $request->input();
         if ($post['search'] == NULL) {
            $data = DB::table('tb_kurir')
                            ->select('id_kurir','judul')
                            ->orderBy('id_kurir',$post['order'])
                            ->paginate($post['much']);
        }else if ($post['field_search'] == 'judul') {
            $data = DB::table('tb_kecamatan')
                            ->select('id_kurir','judul')
                            ->orderBy('id_kurir',$post['order'])
                            ->where($post['field_search'],'like','%'.$post['search'].'%')
                            ->paginate($post['much']);
        }
        return $data;
    }

    public function get_kurir($id)
    {
        return tb_kurir::where('id_kurir', $id)->first();
    }

    public function update_kurir(Request $request, $id)
    {
        $post = $request->input();
        return tb_kurir::where('id_kurir', $id)->update([
            'judul' => $post['judul']
        ]);
    }
    
    public function add_ongkir(Request $request)
    {
       $post = $request->input();
       $get = tb_ongkir::where('id_kecamatan', $post['id_kecamatan'])->count();
       if ($get == 0) {
           tb_ongkir::create($post);
           
       }else{
            return new JsonResponse($errors, 422);   
       }
    }
    public function update_ongkir(Request $request, $id)
    {
        $post = $request->input();
        return tb_ongkir::where('id_ongkir', $id)->update([
            'harga' => $post['harga']
        ]);
    }
    public function delete_ongkir($id)
    {
       return tb_ongkir::where('id_ongkir',$id)->delete();
    }
}
