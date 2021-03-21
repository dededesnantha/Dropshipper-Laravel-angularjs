<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tb_kabupaten extends Model
{
    protected $table = 'tb_kabupaten';
    protected $fillable = ['id_kabupaten','id_provinsi','kabupaten'];
}
