<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\tb_provinsi;
use App\Models\tb_kabupaten;
use App\Models\tb_kecamatan;
use Validator;
use Response;

class AreaContoller extends Controller
{
    public function provinsi()
    {
    	return tb_provinsi::get();
    }
    public function kabupaten($id)
    {
    	return tb_kabupaten::where('id_provinsi',$id)->get();
    }
    public function kecamatan($id)
    {
    	return tb_kecamatan::where('id_kabupaten',$id)->get();
    }
}
