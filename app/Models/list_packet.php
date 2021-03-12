<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class list_packet extends Model
{
    protected $table = 'list_packet';
    protected $fillable = ['id','id_kategori_packet','id_produk'];
}