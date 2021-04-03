<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tb_kurir extends Model
{
    protected $table = 'tb_kurir';
    protected $fillable = ['id_kurir','judul'];
}
