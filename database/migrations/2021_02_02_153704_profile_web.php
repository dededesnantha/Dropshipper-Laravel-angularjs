<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProfileWeb extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profile_web', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 200)->nullable();
            $table->string('no_tlp', 20)->nullable();
            $table->string('email', 200)->nullable();
            $table->string('logo', 200)->nullable();
            $table->string('image_profile', 200)->nullable();
            $table->text('address')->nullable();
            $table->text('deskripsi')->nullable();
            $table->text('syarat_ketentuan')->nullable();
            $table->text('kebijakan_privasi')->nullable();
            $table->text('tentang_kami')->nullable();
            $table->integer('status_popup_pertanyaan');
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
        Schema::drop('profile_web');
    }
}
