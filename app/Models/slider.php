<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class slider extends Model
{
    protected $table = 'tb_slider';
    protected $fillable = ['id','judul','image','posisi'];
}