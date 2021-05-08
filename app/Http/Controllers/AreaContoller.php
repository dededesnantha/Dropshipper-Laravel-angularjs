<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\tb_provinsi;
use App\Models\tb_kabupaten;
use App\Models\tb_kecamatan;
use App\Models\tb_ongkir;

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
    public function ongkos_kirim_all()
    {
        $data = tb_kecamatan::join('tb_kabupaten', 'tb_kecamatan.id_kabupaten','=','tb_kabupaten.id_kabupaten')
                    ->join('tb_provinsi','tb_kabupaten.id_provinsi','=','tb_provinsi.id_provinsi')
                    ->select('tb_kecamatan.id_kecamatan','tb_kecamatan.kecamatan','tb_kabupaten.kabupaten','tb_provinsi.provinsi')
                    ->orderBy('tb_provinsi.provinsi','ASC')
                    ->get();
        return $data;
    }
    public function kurir($id)
    {
        $data = tb_ongkir::join('tb_kurir', 'tb_ongkir.id_kurir','=','tb_kurir.id_kurir')
                    ->where('tb_ongkir.id_kecamatan',$id)
                    ->select('tb_kurir.judul','tb_ongkir.harga')
                    ->get();

        return $data;
    }
}
