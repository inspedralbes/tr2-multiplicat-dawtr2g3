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
            $table->integer('temps');
            $table->timestamps();
            $table->foreign('tipus')->references('id')->on('tipus')->onDelete('set null');
            $table->foreign('categoria')->references('id')->on('categorias')->onDelete('set null');
        });

        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants metres hi ha en 1 quilòmetre?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([1000, 100, 10, 1]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants metres hi ha en 30 centímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([0.3, 0.03, 3, 30]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants metres hi ha en 20 decímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([2, 0.02, 0.2, 20]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants centímetres hi ha en 42 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([4200, 420, 42, 42000]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants metres hi ha en 59 decímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([5.9, 0.059, 0.59, 59]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants qilòmetres hi ha en 3400 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([3.4, 0.034, 0.34, 34]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants centímetres hi ha en 79 decímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([790, 7900, 79, 79000]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quants centímetres hi ha en 79 decímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([790, 7900, 79, 79000]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quina és la longitud de 3 quilòmetres en metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([3000, 30000, 30, 300]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => null,
            'unitatInicial' => null,
            'valorFinal' => null,
            'unitatFinal' => null,
            'enunciat' => 'Quant és 4,5 centímetres en mil·límetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([45, 450, 4.5, 4500]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'm',
            'valorFinal' => 0,
            'unitatFinal' => 'mm',
            'enunciat' => 'Quants mil·límetres hi ha en 2 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([2000, 200, 20, 20000]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'km',
            'valorFinal' => 0,
            'unitatFinal' => 'm',
            'enunciat' => 'Quina és la longitud de 5 quilòmetres en metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([5000, 500, 50, 5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dm',
            'valorFinal' => 0,
            'unitatFinal' => 'cm',
            'enunciat' => 'Quant és 3 decímetres en centímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([30, 300, 3, 3000]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'm',
            'valorFinal' => 0,
            'unitatFinal' => 'km',
            'enunciat' => 'Quants quilòmetres hi ha en 1200 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([1.2, 12, 120, 1200]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'm',
            'valorFinal' => 0,
            'unitatFinal' => 'cm',
            'enunciat' => 'Quants centímetres hi ha en 2,5 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([250, 2500, 25, 2.5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dm',
            'valorFinal' => 0,
            'unitatFinal' => 'mm',
            'enunciat' => 'Quant és 4 decímetres en mil·límetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([400, 40, 4, 4000]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'm',
            'valorFinal' => 0,
            'unitatFinal' => 'km',
            'enunciat' => 'Quants quilòmetres hi ha en 5000 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([5, 50, 500, 0.5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'm',
            'valorFinal' => 0,
            'unitatFinal' => 'mm',
            'enunciat' => 'Quants mil·límetres hi ha en 1,8 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([1800, 180, 18, 1.8]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'km',
            'valorFinal' => 0,
            'unitatFinal' => 'm',
            'enunciat' => 'Quina és la longitud de 4,5 quilòmetres en metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([4500, 450, 45, 4.5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dm',
            'valorFinal' => 0,
            'unitatFinal' => 'cm',
            'enunciat' => 'Quant és 2,3 decímetres en centímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([23, 230, 2.3, 2300]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'm',
            'valorFinal' => 0,
            'unitatFinal' => 'km',
            'enunciat' => 'Quants quilòmetres hi ha en 8000 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([8, 80, 800, 8000]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'm',
            'valorFinal' => 0,
            'unitatFinal' => 'cm',
            'enunciat' => 'Quants centímetres hi ha en 3,7 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([370, 37, 3.7, 3700]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'km',
            'valorFinal' => 0,
            'unitatFinal' => 'm',
            'enunciat' => 'Quina és la longitud de 2,8 quilòmetres en metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([2800, 280, 28, 2.8]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dm',
            'valorFinal' => 0,
            'unitatFinal' => 'cm',
            'enunciat' => 'Quant és 5,4 decímetres en centímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([54, 540, 5.4, 5400]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'km',
            'valorFinal' => 0,
            'unitatFinal' => 'm',
            'enunciat' => 'Quina és la longitud de 4,5 quilòmetres en metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([4500, 450, 45, 4.5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dm',
            'valorFinal' => 0,
            'unitatFinal' => 'cm',
            'enunciat' => 'Quant és 2,3 decímetres en centímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([23, 230, 2.3, 2300]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'm',
            'valorFinal' => 0,
            'unitatFinal' => 'mm',
            'enunciat' => 'Quants mil·límetres hi ha en 1,2 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([1200, 120, 12, 1.2]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dg',
            'valorFinal' => 0,
            'unitatFinal' => 'cg',
            'enunciat' => 'Quant és 4 decígrams en centígrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([40, 400, 4, 4000]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'kg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quants grams hi ha en 2 quilògrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([2000, 200, 20, 2]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'kg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quants grams hi ha en 0,5 quilògrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([500, 50, 5, 0.5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quant és 300 decígrams en grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([30, 300, 3000, 3]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'g',
            'valorFinal' => 0,
            'unitatFinal' => 'mg',
            'enunciat' => 'Quants mil·lígrams hi ha en 2,5 grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([2500, 250, 25, 2.5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'kg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quants grams hi ha en 1,2 quilògrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([1200, 120, 12, 1.2]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quant és 500 decígrams en grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([50, 500, 5000, 5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'g',
            'valorFinal' => 0,
            'unitatFinal' => 'mg',
            'enunciat' => 'Quants mil·lígrams hi ha en 2,8 grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([2800, 280, 28, 2.8]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'kg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quants grams hi ha en 0,8 quilògrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([800, 80, 8, 0.8]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quant és 450 decígrams en grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([45, 450, 4500, 4.5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'g',
            'valorFinal' => 0,
            'unitatFinal' => 'mg',
            'enunciat' => 'Quants mil·ligrams hi ha en 2,3 grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([2300, 230, 23, 2.3]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        // DB::table('preguntas')->insert([
        //     'tipus' => 2,
        //     'temps' => 20,
        //     'valorInicial' => 0,
        //     'unitatInicial' => '',
        //     'valorFinal' => 0,
        //     'unitatFinal' => '',
        //     'enunciat' => 'Quina és la mesura internacional de la massa?',
        //     'intermig' => null,
        //     'dificultat' => 2,
        //     'categoria' => 3,
        //     'respostes' => json_encode(["kg", "hg", "g", "mg"]),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        
        // DB::table('preguntas')->insert([
        //     'tipus' => 2,
        //     'temps' => 20,
        //     'valorInicial' => 0,
        //     'unitatInicial' => '',
        //     'valorFinal' => 0,
        //     'unitatFinal' => '',
        //     'enunciat' => 'Quina és la mesura internacional de la longitud?',
        //     'intermig' => null,
        //     'dificultat' => 2,
        //     'categoria' => 1,
        //     'respostes' => json_encode(["km", "hm", "m", "cm"]),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);

        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dm',
            'valorFinal' => 0,
            'unitatFinal' => 'cm',
            'enunciat' => 'Quant és 2,3 decímetres en centímetres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([23, 230, 2.3, 2300]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'm',
            'valorFinal' => 0,
            'unitatFinal' => 'mm',
            'enunciat' => 'Quants mil·límetres hi ha en 1,2 metres?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 1,
            'respostes' => json_encode([1200, 120, 12, 1.2]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dg',
            'valorFinal' => 0,
            'unitatFinal' => 'cg',
            'enunciat' => 'Quant és 4 decígrams en centígrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([40, 400, 4, 4000]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'kg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quants grams hi ha en 2 quilògrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([2000, 200, 20, 2]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'kg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quants grams hi ha en 0,5 quilògrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([500, 50, 5, 0.5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quant és 300 decígrams en grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([30, 300, 3000, 3]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'g',
            'valorFinal' => 0,
            'unitatFinal' => 'mg',
            'enunciat' => 'Quants mil·lígrams hi ha en 2,5 grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([2500, 250, 25, 2.5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'kg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quants grams hi ha en 1,2 quilògrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([1200, 120, 12, 1.2]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quant és 500 decígrams en grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([50, 500, 5000, 5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'g',
            'valorFinal' => 0,
            'unitatFinal' => 'mg',
            'enunciat' => 'Quants mil·lígrams hi ha en 2,8 grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([2800, 280, 28, 2.8]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'kg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quants grams hi ha en 0,8 quilògrams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([800, 80, 8, 0.8]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'dg',
            'valorFinal' => 0,
            'unitatFinal' => 'g',
            'enunciat' => 'Quant és 450 decígrams en grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([45, 450, 4500, 4.5]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        DB::table('preguntas')->insert([
            'tipus' => 2,
            'temps' => 20,
            'valorInicial' => 0,
            'unitatInicial' => 'g',
            'valorFinal' => 0,
            'unitatFinal' => 'mg',
            'enunciat' => 'Quants mil·lígrams hi ha en 2,3 grams?',
            'intermig' => null,
            'dificultat' => 2,
            'categoria' => 3,
            'respostes' => json_encode([2300, 230, 23, 2.3]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        // DB::table('preguntas')->insert([
        //     'tipus' => 2,
        //     'temps' => 20,
        //     'valorInicial' => 0,
        //     'unitatInicial' => '',
        //     'valorFinal' => 0,
        //     'unitatFinal' => '',
        //     'enunciat' => 'Quina és la mesura internacional de la massa?',
        //     'intermig' => null,
        //     'dificultat' => 2,
        //     'categoria' => 3,
        //     'respostes' => json_encode(["kg", "hg", "g", "mg"]),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        
        // DB::table('preguntas')->insert([
        //     'tipus' => 2,
        //     'temps' => 20,
        //     'valorInicial' => 0,
        //     'unitatInicial' => '',
        //     'valorFinal' => 0,
        //     'unitatFinal' => '',
        //     'enunciat' => 'Quina és la mesura internacional de la longitud?',
        //     'intermig' => null,
        //     'dificultat' => 2,
        //     'categoria' => 1,
        //     'respostes' => json_encode(["km", "hm", "m", "cm"]),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);

        // DB::table('preguntas')->insert([
        //     'tipus' => 2,
        //     'temps' => 20,
        //     'valorInicial' => 0,
        //     'unitatInicial' => '',
        //     'valorFinal' => 0,
        //     'unitatFinal' => '',
        //     'enunciat' => 'Quina és la mesura internacional de la massa?',
        //     'intermig' => null,
        //     'dificultat' => 2,
        //     'categoria' => 3,
        //     'respostes' => json_encode(["kg", "hg", "g", "mg"]),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        
        // DB::table('preguntas')->insert([
        //     'tipus' => 2,
        //     'temps' => 20,
        //     'valorInicial' => 0,
        //     'unitatInicial' => '',
        //     'valorFinal' => 0,
        //     'unitatFinal' => '',
        //     'enunciat' => 'Quina és la mesura internacional de la longitud?',
        //     'intermig' => null,
        //     'dificultat' => 2,
        //     'categoria' => 1,
        //     'respostes' => json_encode(["km", "hm", "m", "cm"]),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        
        // DB::table('preguntas')->insert([
        //     'tipus' => 2,
        //     'temps' => 20,
        //     'valorInicial' => 0,
        //     'unitatInicial' => '',
        //     'valorFinal' => 0,
        //     'unitatFinal' => '',
        //     'enunciat' => 'Quina és la mesura internacional del volum?',
        //     'intermig' => null,
        //     'dificultat' => 2,
        //     'categoria' => 4,
        //     'respostes' => json_encode(["m³", "dm³", "cm³", "km³"]),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        
        // DB::table('preguntas')->insert([
        //     'tipus' => 2,
        //     'temps' => 20,
        //     'valorInicial' => 0,
        //     'unitatInicial' => '',
        //     'valorFinal' => 0,
        //     'unitatFinal' => '',
        //     'enunciat' => 'Quina és la mesura internacional per a la superfície?',
        //     'intermig' => null,
        //     'dificultat' => 2,
        //     'categoria' => 1,
        //     'respostes' => json_encode(["m²", "hm²", "km²", "cm²"]),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        
        // DB::table('preguntas')->insert([
        //     'tipus' => 2,
        //     'temps' => 20,
        //     'valorInicial' => 0,
        //     'unitatInicial' => '',
        //     'valorFinal' => 0,
        //     'unitatFinal' => '',
        //     'enunciat' => 'Quina és la mesura internacional del temps?',
        //     'intermig' => null,
        //     'dificultat' => 2,
        //     'categoria' => 2,
        //     'respostes' => json_encode(["s", "min", "h", "ms"]),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        
 

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preguntas');
    }

};

