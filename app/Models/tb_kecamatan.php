<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tb_kecamatan extends Model
{
    protected $table = 'tb_kecamatan';
    protected $fillable = ['id_provinsi','id_kabupaten','kecamatan'];
}
