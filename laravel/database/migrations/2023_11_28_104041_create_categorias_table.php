<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categorias', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->timestamps();
        });
        DB::table('categorias')->insert([
            'nom' => 'Unitats de longitud',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('categorias')->insert([
            'nom' => 'Unitats de temp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('categorias')->insert([
            'nom' => 'Unitats de massa',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('categorias')->insert([
            'nom' => 'Unitats de volum',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('categorias')->insert([
            'nom' => 'Velocitat',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorias');
    }
    

};
