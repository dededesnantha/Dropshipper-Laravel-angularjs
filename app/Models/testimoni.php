<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class testimoni extends Model
{
    protected $table = 'testimoni';
    protected $fillable = ['id','nama','deskripsi','image','date'];
}