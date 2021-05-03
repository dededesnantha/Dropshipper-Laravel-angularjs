<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tb_transaksi extends Model
{
    protected $table = 'tb_transaksi';
    protected $fillable = ['tgl_transkasi','total_transkasi','status_transaksi','metode_transaksi','id_ongkir','tgl_konfirm','code_transaksi','image_transfer','id_user','tgl_expired'];
    public $timestamps = false;
}
