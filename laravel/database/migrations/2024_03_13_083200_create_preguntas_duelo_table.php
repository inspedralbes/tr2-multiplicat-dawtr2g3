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
        Schema::create('pregunta_duelos', function (Blueprint $table) {
            $table->id();
            $table->float('valorInicial', 2)->nullable();
            $table->string('unitatInicial')->nullable();
            $table->float('valorFinal', 2)->nullable();
            $table->string('unitatFinal')->nullable();
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

        DB::table('pregunta_duelos')->insert([
            'tipus' => 2,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quant és 1500 mil·lilitres en litres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode(["1.5 L", "2.5 L", "3.5 L", "5 L"]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_duelos')->insert([
            'tipus' => 2,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quant és 4 quilòmetres en metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode(["4000 m", "5000 m", "6000 m", "7000 m"]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_duelos')->insert([
            'tipus' => 2,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants grams són 0.5 quilògrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 2,
            'respostes' => json_encode(["500 g", "750 g", "1000 g", "1250 g"]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_duelos')->insert([
            'tipus' => 2,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quina és l\'àrea d\'un cercle amb radi de 2 centímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode(["4π cm²", "8π cm²", "12π cm²", "16π cm²"]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_duelos')->insert([
            'tipus' => 2,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quant temps es tarda en recórrer 60 km si la velocitat és de 30 km/h?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 4,
            'respostes' => json_encode(["2 h", "3 h", "4 h", "5 h"]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_duelos')->insert([
            'tipus' => 2,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants mil·lilitres hi ha en 0.75 litres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode(["750 mL", "1000 mL", "1250 mL", "1500 mL"]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_duelos')->insert([
            'tipus' => 2,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quant és 5.5 quilòmetres en metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode(["5500 m", "6000 m", "6500 m", "7000 m"]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_duelos')->insert([
            'tipus' => 2,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants grams són 1.2 quilògrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 2,
            'respostes' => json_encode(["1200 g", "1400 g", "1600 g", "1800 g"]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_duelos')->insert([
            'tipus' => 2,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quina és l\'àrea d\'un quadrat amb costat de 3 centímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode(["9 cm²", "12 cm²", "15 cm²", "18 cm²"]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('pregunta_duelos')->insert([
            'tipus' => 2,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quant temps es tarda en recórrer 80 km si la velocitat és de 40 km/h?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 4,
            'respostes' => json_encode(["2 h", "3 h", "4 h", "5 h"]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pregunta_duelos');
    }
};
