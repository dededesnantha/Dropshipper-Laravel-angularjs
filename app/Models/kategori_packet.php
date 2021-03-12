<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class kategori_packet extends Model
{
    protected $table = 'kategori_packet';
    protected $fillable = ['id','title','spesial_text','harga','posisi'];
}