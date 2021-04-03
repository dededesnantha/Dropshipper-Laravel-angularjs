<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TbUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_user', function (Blueprint $table) {
            $table->id('id_user');
            $table->string('nama', 300);
            $table->string('username', 300);
            $table->string('email', 300);
            $table->string('password', 700);
            $table->string('telephone', 20)->nullable();
            $table->string('foto_user', 600)->nullable();
            $table->integer('id_provinsi')->nullable();
            $table->integer('id_kabupaten')->nullable();
            $table->integer('id_kecamatan')->nullable();
            $table->text('address')->nullable();
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
        Schema::drop('tb_user');
    }
}
