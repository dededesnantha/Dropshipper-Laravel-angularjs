<?php

namespace App\Http\Controllers\upload;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\tb_produk_gambar;
use File;

class UploadImage extends Controller
{
    
    public function image_produk(Request $request, $id)
    {
    	if($request->file('file') != null){
            
            $file = $request->file('file');
            
            $while = 0;
            $string_replace = array('\'', ';', '[', ']', '{', '}', '|', '^', '~','?','/');            
            $file_name = str_replace(' ','-',str_replace($string_replace, '',$file->getClientOriginalName()));           
            $temp_file_name = $file_name;
            $file_same = 1;
            while (file_exists(public_path('image/'.$file_name))) {
                $file_name = str_replace('.','-'.$file_same.'.',$temp_file_name);
                $file_same++;
            }
            $file->move('image/', $file_name); 
            public_path() . DIRECTORY_SEPARATOR . 'image' .DIRECTORY_SEPARATOR . $file_name;
           	$data = [
                    'id_produk' => $id,
                    'gambar' => $file_name
            ];
            tb_produk_gambar::create($data);
            return response()->json(['data'=>$file_name,'status' => 200]);
        }else{
            return response()->json(['data'=>'','status' => 400]);
        }
    }

    public function image_user(Request $request)
    {
        if($request->file('file') != null){
            
            $file = $request->file('file');
            
            $while = 0;
            $string_replace = array('\'', ';', '[', ']', '{', '}', '|', '^', '~','?','/');            
            $file_name = str_replace(' ','-',str_replace($string_replace, '',$file->getClientOriginalName()));           
            $temp_file_name = $file_name;
            $file_same = 1;
            while (file_exists(public_path('image/'.$file_name))) {
                $file_name = str_replace('.','-'.$file_same.'.',$temp_file_name);
                $file_same++;
            }
            $file->move('image/', $file_name); 
            public_path() . DIRECTORY_SEPARATOR . 'image' .DIRECTORY_SEPARATOR . $file_name;
            return response()->json(['data'=>$file_name,'status' => 200]);
        }else{
            return response()->json(['data'=>'','status' => 400]);
        }
    }
}
