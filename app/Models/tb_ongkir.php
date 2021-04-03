<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tb_ongkir extends Model
{
    protected $table = 'tb_ongkir';
    protected $fillable = ['id_kurir','id_kecamatan','harga'];
}