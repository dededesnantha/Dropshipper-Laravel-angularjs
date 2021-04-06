<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\slider;
use App\Models\kategori;

class HomeController extends Controller
{
    public function slider()
    {
        $data = slider::select('judul','image','posisi')->orderBy('posisi','ASC')->get();
        return $data;        
    }
    public function get_kategori()
    {
    	$data = kategori::select('title','gambar','status','slug')->where('status','=',1)->get();
        return $data; 
    }
}
