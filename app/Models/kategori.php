<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class kategori extends Model
{
    protected $table = 'tb_kategori';
    protected $fillable = ['id','title','deskripsi','gambar','status','slug'];
}
