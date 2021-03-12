<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profile_web extends Model
{
    protected $table = 'profile_web';
    protected $fillable = ['id','nama','no_tlp','email','logo','image_profile','address','deskripsi','syarat_ketentuan','kebijakan_privasi','tentang_kami','status_popup_pertanyaan'];
}