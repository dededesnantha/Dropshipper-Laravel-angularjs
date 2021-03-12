<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profile_team extends Model
{
    protected $table = 'profile_team';
    protected $fillable = ['id','nama','jabatan','image','logo'];
}