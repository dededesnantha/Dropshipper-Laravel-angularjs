<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class home_setting extends Model
{
    protected $table = 'home_setting';
    protected $fillable = ['id','text','judul','deskripsi'];
}
