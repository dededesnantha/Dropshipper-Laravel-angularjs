<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use SoftDeletes;


class tb_order extends Model
{
    protected $table = 'tb_order';
    protected $fillable = ['id_order','id_user','id_produk','id_color','kuantitas','size','id_transaksi'];
    protected $dates = ['deleted_at'];
}