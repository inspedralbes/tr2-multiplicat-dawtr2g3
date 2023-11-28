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

            $table->string('tipus');
            $table->float('valorInicial',2);
            $table->string('unitatInicial');
            $table->float('valorFinal',2);
            $table->string('unitatFinal');
            $table->string('enunciat');
            $table->string('intermig');
            $table->integer('dificultat');
            $table->unsignedBigInteger('categoria')->nullable();
            $table->foreign('categoria')->references('id')->on('categorias')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preguntas');
    }
};
