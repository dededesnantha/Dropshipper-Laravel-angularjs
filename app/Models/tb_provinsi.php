<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tb_provinsi extends Model
{
    protected $table = 'tb_provinsi';
    protected $fillable = ['id_provinsi','provinsi'];
}