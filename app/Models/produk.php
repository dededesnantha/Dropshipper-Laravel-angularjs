<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class produk extends Model
{
    protected $table = 'tb_produk';
    protected $fillable = ['id','nama_produk','id_kategori','deskripsi','gambar','status','slug','stok','harga','size','warna'];
}
