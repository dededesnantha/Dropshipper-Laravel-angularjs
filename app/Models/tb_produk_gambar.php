<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tb_produk_gambar extends Model
{
    protected $table = 'tb_produk_gambar';
    protected $fillable = ['id','id_produk','gambar'];
}