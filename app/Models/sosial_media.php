<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sosial_media extends Model
{
    protected $table = 'sosial_media';
    protected $fillable = ['id','judul','link','image'];
}