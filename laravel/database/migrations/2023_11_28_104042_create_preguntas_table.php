<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('preguntas', function (Blueprint $table) {
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

        DB::table('preguntas')->insert([
            'tipus' => 1,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quina és la longitud de 5 metres en centímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([
                 500,50,5,100
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Pregunta 2
        DB::table('preguntas')->insert([
            'tipus' => 1,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quant temps hi ha en una hora?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 2,
            'respostes' => json_encode([60,30,45,90]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Pregunta 3
        DB::table('preguntas')->insert([
            'tipus' => 1,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quina és la massa de 500 grams en quilograms?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 3,
            'respostes' => json_encode([0.5,5,50,0.05]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Pregunta 4
        DB::table('preguntas')->insert([
            'tipus' => 1,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quina és la capacitat d\'una ampolla de 2 litres en mililitres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 4,
            'respostes' => json_encode([2000,20,200,2]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Pregunta 5
        DB::table('preguntas')->insert([
            'tipus' => 1,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quina és la velocitat de 60 quilòmetres per hora en metres per segon?',
            'intermig' => null,
            'dificultat' => 3,
            'categoria' => 5,
            'respostes' => json_encode([16.67,20,15,25]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        // Pregunta 6 - Categoría 1 (Unitats de longitud)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la longitud de 12 metres en mil·límetres?',
    'intermig' => null,
    'dificultat' => 2,
    'categoria' => 1,
    'respostes' => json_encode([12000,1200,120,120000]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 7 - Categoría 2 (Unitats de temp)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quant temps hi ha en mitja jornada (12 hores)?',
    'intermig' => null,
    'dificultat' => 2,
    'categoria' => 2,
    'respostes' => json_encode([720,360,540,1080]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 8 - Categoría 3 (Unitats de massa)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la massa de 1.5 quilograms en grams?',
    'intermig' => null,
    'dificultat' => 3,
    'categoria' => 3,
    'respostes' => json_encode([1500,15,150,0.15]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 9 - Categoría 4 (Unitats de volum)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la capacitat d\'un recipient de 5 litres en mil·lilitres?',
    'intermig' => null,
    'dificultat' => 2,
    'categoria' => 4,
    'respostes' => json_encode([5000,50,500,5]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 10 - Categoría 5 (Velocitat)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la velocitat de 30 quilòmetres per hora en metres per segon?',
    'intermig' => null,
    'dificultat' => 3,
    'categoria' => 5,
    'respostes' => json_encode([8.33,10,7.5,15]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 11 - Categoría 1 (Unitats de longitud)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la longitud de 15 metres en centímetres?',
    'intermig' => null,
    'dificultat' => 2,
    'categoria' => 1,
    'respostes' => json_encode([1500,150,15,15000]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 12 - Categoría 2 (Unitats de temp)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quant temps hi ha en una setmana (7 dies)?',
    'intermig' => null,
    'dificultat' => 2,
    'categoria' => 2,
    'respostes' => json_encode([10080,5040,7200,14400]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 13 - Categoría 3 (Unitats de massa)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la massa de 2.7 quilograms en grams?',
    'intermig' => null,
    'dificultat' => 3,
    'categoria' => 3,
    'respostes' => json_encode([2700,27,270,2.7]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 14 - Categoría 4 (Unitats de volum)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la capacitat d\'un recipient de 3 litres en mil·lilitres?',
    'intermig' => null,
    'dificultat' => 2,
    'categoria' => 4,
    'respostes' => json_encode([3000,30,300,3]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 15 - Categoría 5 (Velocitat)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la velocitat de 45 quilòmetres per hora en metres per segon?',
    'intermig' => null,
    'dificultat' => 3,
    'categoria' => 5,
    'respostes' => json_encode([12.5,15,10,20]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 16 - Categoría 1 (Unitats de longitud)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la longitud de 20 metres en centímetres?',
    'intermig' => null,
    'dificultat' => 2,
    'categoria' => 1,
    'respostes' => json_encode([2000,200,20,20000]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 17 - Categoría 2 (Unitats de temp)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quant temps hi ha en un mes (30 dies)?',
    'intermig' => null,
    'dificultat' => 2,
    'categoria' => 2,
    'respostes' => json_encode([43200,21600,30240,60480]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 18 - Categoría 3 (Unitats de massa)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la massa de 4.5 quilograms en grams?',
    'intermig' => null,
    'dificultat' => 3,
    'categoria' => 3,
    'respostes' => json_encode([4500,45,450,4.5]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 19 - Categoría 4 (Unitats de volum)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la capacitat d\'un recipient de 7 litres en mil·lilitres?',
    'intermig' => null,
    'dificultat' => 2,
    'categoria' => 4,
    'respostes' => json_encode([7000,70,700,7]),
    'created_at' => now(),
    'updated_at' => now(),
]);

// Pregunta 20 - Categoría 5 (Velocitat)
DB::table('preguntas')->insert([
    'tipus' => 1,
    'valorInicial' => null,
    'unitatInicial' => null,
    'valorFinal' => null,
    'unitatFinal' => null,
    'enunciat' => 'Quina és la velocitat de 55 quilòmetres per hora en metres per segon?',
    'intermig' => null,
    'dificultat' => 3,
    'categoria' => 5,
    'respostes' => json_encode([15.28,18,12,22]),
    'created_at' => now(),
    'updated_at' => now(),
]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preguntas');
    }
    
};

