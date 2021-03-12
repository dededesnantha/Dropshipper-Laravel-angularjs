<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class list_pertanyaan extends Model
{
    protected $table = 'list_pertanyaan';
    protected $fillable = ['id','judul','jawab'];
}