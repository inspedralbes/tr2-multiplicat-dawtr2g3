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
            $table->integer('dificultat')->nullable();
            $table->string('respostes')->nullable();
            $table->unsignedBigInteger('tipus')->nullable();
            $table->unsignedBigInteger('categoria')->nullable();
            $table->integer('temps');
            $table->timestamps();
            $table->foreign('tipus')->references('id')->on('tipus')->onDelete('set null');
            $table->foreign('categoria')->references('id')->on('categorias')->onDelete('set null');
        });



        DB::unprepared("
        INSERT INTO `preguntas` (`enunciat`,`categoria` ,`tipus`,`temps`,`respostes`) VALUES
        ('Quants metres hi ha en 1 quilòmetre?',1,2,20,'[`1000`,`100`,`10`,`1`]'),
        ('Quants metres hi ha en 30 centímetres?',1,2,20,'[`0.3`,`0.03`,`3`,`30`]'),
        ('Quants metres hi ha en 20 decímetres?',1,2,20,'[`2`,`0.02`,`0.2`,`20`]'),
        ('Quants centímetres hi ha en 42 metres?',1,2,20,'[`4200`,`420`,`42`,`42000`]'),
        ('Quants metres hi ha en 59 decímetres?',1,2,20,'[`5.9`,`0.059`,`0.59`,`59`]'),
        ('Quants qilòmetres hi ha en 3400 metres?',1,2,20,'[`3.4`,`0.034`,`0.34`,`34`]'),
        ('Quants centímetres hi ha en 79 decímetres?',1,2,20,'[`790`,`7900`,`79`,`79000`]'),
        ('Quants centímetres hi ha en 79 decímetres?',1,2,20,'[`790`,`7900`,`79`,`79000`]'),
        ('Quina és la longitud de 3 quilòmetres en metres?',1,2,20,'[`3000`,`30000`,`30`,`300`]'),
        ('Quant és 4,5 centímetres en mil·límetres?',1,2,20,'[`45`,`450`,`4.5`,`4500`]'),
        ('Quants mil·límetres hi ha en 2 metres?',1,2,20,'[`2000`,`200`,`20`,`20000`]'),
        ('Quina és la longitud de 5 quilòmetres en metres?',1,2,20,'[`5000`,`500`,`50`,`5`]'),
        ('Quant és 3 decímetres en centímetres?',1,2,20,'[`30`,`300`,`3`,`3000`]'),
        ('Quants quilòmetres hi ha en 1200 metres?',1,2,20,'[`1.2`,`12`,`120`,`1200`]'),
        ('Quants centímetres hi ha en 2,5 metres?',1,2,20,'[`250`,`2500`,`25`,`2.5`]'),
        ('Quina és la longitud de 3,2 quilòmetres en metres?',1,2,20,'[`3200`,`320`,`32`,`3.2`]'),
        ('Quant és 4 decímetres en mil·límetres?',1,2,20,'[`400`,`40`,`4`,`4000`]'),
        ('Quants quilòmetres hi ha en 5000 metres?',1,2,20,'[`5`,`50`,`500`,`0.5`]'),
        ('Quants mil·límetres hi ha en 1,8 metres?',1,2,20,'[`1800`,`180`,`18`,`1.8`]'),
        ('Quina és la longitud de 4,5 quilòmetres en metres?',1,2,20,'[`4500`,`450`,`45`,`4.5`]'),
        ('Quant és 2,3 decímetres en centímetres?',1,2,20,'[`23`,`230`,`2.3`,`2300`]'),
        ('Quants quilòmetres hi ha en 8000 metres?',1,2,20,'[`8`,`80`,`800`,`8000`]'),
        ('Quants centímetres hi ha en 3,7 metres?',1,2,20,'[`370`,`37`,`3.7`,`3700`]'),
        ('Quina és la longitud de 2,8 quilòmetres en metres?',1,2,20,'[`2800`,`280`,`28`,`2.8`]'),
        ('Quant és 5,4 decímetres en centímetres?',1,2,20,'[`54`,`540`,`5.4`,`5400`]'),
        ('Quants mil·límetres hi ha en 1,2 metres?',1,2,20,'[`1200`,`120`,`12`,`1.2`]'),
        ('Quant és 4 decígrams en centígrams?',3,2,20,'[`40`,`400`,`4`,`4000`]'),
        ('Quants grams hi ha en 2 quilògrams?',3,2,20,'[`2000`,`200`,`20`,`2`]'),
        ('Quants grams hi ha en 0,5 quilògrams?',3,2,20,'[`500`,`50`,`5`,`0.5`]'),
        ('Quant és 300 decígrams en grams?',3,2,20,'[`30`,`300`,`3000`,`3`]'),
        ('Quants mil·lígrams hi ha en 2,5 grams?',3,2,20,'[`2500`,`250`,`25`,`2.5`]'),
        ('Quants grams hi ha en 1,2 quilògrams?',3,2,20,'[`1200`,`120`,`12`,`1.2`]'),
        ('Quant és 500 decígrams en grams?',3,2,20,'[`50`,`500`,`5000`,`5`]'),
        ('Quants mil·lígrams hi ha en 2,8 grams?',3,2,20,'[`2800`,`280`,`28`,`2.8`]'),
        ('Quants grams hi ha en 0,8 quilògrams?',3,2,20,'[`800`,`80`,`8`,`0.8`]'),
        ('Quant és 450 decígrams en grams?',3,2,20,'[`45`,`450`,`4500`,`4.5`]'),
        ('Quants mil·lígrams hi ha en 2,3 grams?',3,2,20,'[`2300`,`230`,`23`,`2.3`]'),
        ('Quina és la mesura internacional de la massa?',3,2,20,'[`kg`,`hg`,`g`,`mg`]'),
        ('Quina és la mesura internacional de la longitud?',1,2,20,'[`km`,`hm`,`m`,`cm`]'),
        ('Quina és la mesura internacional del volum?',4,2,20,'[`m³`,`dm³`,`cm³`,`km³`]'),
        ('Quina és la mesura internacional per a la superfície?',1,2,20,'[`m²`,`hm²`,`km²`,`cm²`]'),
        ('Quina és la mesura internacional del temps?',2,2,20,'[`s`,`min`,`h`,`ms`]');
        ");

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preguntas');
    }

};

