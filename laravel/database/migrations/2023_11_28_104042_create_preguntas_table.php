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
                ['resposta' => 500],
                ['resposta' => 50],
                ['resposta' => 5],
                ['resposta' => 100],
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
            'respostes' => json_encode([
                ['resposta' => 60],
                ['resposta' => 30],
                ['resposta' => 45],
                ['resposta' => 90],
            ]),
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
            'respostes' => json_encode([
                ['resposta' => 0.5],
                ['resposta' => 5],
                ['resposta' => 50],
                ['resposta' => 0.05],
            ]),
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
            'respostes' => json_encode([
                ['resposta' => 2000],
                ['resposta' => 20],
                ['resposta' => 200],
                ['resposta' => 2],
            ]),
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
            'respostes' => json_encode([
                ['resposta' => 16.67],
                ['resposta' => 20],
                ['resposta' => 15],
                ['resposta' => 25],
            ]),
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

