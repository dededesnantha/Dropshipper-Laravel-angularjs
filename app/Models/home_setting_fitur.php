<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class home_setting_fitur extends Model
{
    protected $table = 'home_setting_fitur';
    protected $fillable = ['id','id_home','id_produk'];
}