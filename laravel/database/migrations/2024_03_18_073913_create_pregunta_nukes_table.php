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
        Schema::create('pregunta_nukes', function (Blueprint $table) {
            $table->id();
            $table->string('enunciat')->nullable();
            $table->string('intermig')->nullable();
            $table->integer('dificultat');
            $table->string('respostes')->nullable();
            $table->unsignedBigInteger('tipus')->nullable();
            $table->unsignedBigInteger('categoria')->nullable();
            $table->timestamps();
            $table->foreign('tipus')->references('id')->on('tipus')->onDelete('set null');
            $table->foreign('categoria')->references('id')->on('categorias')->onDelete('set null');
        });

        DB::table('pregunta_nukes')->insert([
            'tipus' => 2,
            
           
            'enunciat' => '¿Cuál es el resultado de la siguiente operación: (3^4 * 5^2) / (2^3 * 5)?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 1,
            'respostes' => json_encode(['75', '225', '375', '625']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_nukes')->insert([
            'tipus' => 2,
           
            'enunciat' => 'Si un círculo tiene un radio de 6 cm, ¿cuál es su área?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 1,
            'respostes' => json_encode(['36π cm²', '18π cm²', '12π cm²', '24π cm²']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_nukes')->insert([
            'tipus' => 2,
           
            'enunciat' => '¿Cuántos grados mide el ángulo central de un decágono regular?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 1,
            'respostes' => json_encode(['36°', '45°', '72°', '144°']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_nukes')->insert([
            'tipus' => 2,
           
            'enunciat' => 'Si un tren viaja a una velocidad constante de 80 km/h, ¿cuánto tiempo tardará en recorrer 320 km?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 1,
            'respostes' => json_encode(['4 horas', '6 horas', '8 horas', '10 horas']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_nukes')->insert([
            'tipus' => 2,
           
            'enunciat' => 'Resuelve la ecuación: √(x+3) + 5 = 11',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 1,
            'respostes' => json_encode(['x = 9', 'x = 4', 'x = 16', 'x = 25']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_nukes')->insert([
            'tipus' => 2,
           
            'enunciat' => '¿Cuál es el resultado de 1/2 + 2/3 + 3/4?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 1,
            'respostes' => json_encode(['2.083', '2.3125', '2.5', '3.125']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_nukes')->insert([
            'tipus' => 2,
           
            'enunciat' => 'Un cubo tiene una arista de longitud 4 cm. ¿Cuál es su volumen?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 1,
            'respostes' => json_encode(['64 cm³', '128 cm³', '256 cm³', '512 cm³']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_nukes')->insert([
            'tipus' => 2,
           
            'enunciat' => '¿Cuál es la suma de los primeros 10 números primos?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 1,
            'respostes' => json_encode(['129', '155', '210', '225']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_nukes')->insert([
            'tipus' => 2,
            
            'enunciat' => '¿Cuántos lados tiene un polígono regular si la suma de los ángulos interiores es 1080 grados?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 1,
            'respostes' => json_encode(['6 lados', '7 lados', '8 lados', '9 lados']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_nukes')->insert([
            'tipus' => 2,
            
            'enunciat' => 'Si un artículo tiene un precio original de $80 y está en oferta con un descuento del 25%, ¿cuál es el precio final?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 1,
            'respostes' => json_encode(['64 dólares', '70 dólares', '75 dólares', '60 dólares']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pregunta_nukes');
    }
};
