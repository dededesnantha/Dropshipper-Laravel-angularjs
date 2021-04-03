<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tb_user extends Model
{
    protected $table = 'tb_user';
    protected $fillable = ['nama','username','email','password','telephone','foto_user','id_provinsi','id_kabupaten','id_kecamatan','address'];
}