<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Produk extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produk', function (Blueprint $table) {
            
            $table->id();
            $table->string('title', 300);
            $table->integer('id_kategori');
            $table->text('deskripsi');
            $table->string('image', 300);
            $table->integer('status');
            $table->string('slug', 300);
            $table->integer('status_unggulan');
            $table->integer('harga');
            $table->string('icon', 300);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produk');
    }
}
