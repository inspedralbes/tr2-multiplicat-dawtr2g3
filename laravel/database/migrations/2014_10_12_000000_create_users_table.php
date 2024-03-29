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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('mail')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('verificat')->default(false);
            $table->unsignedBigInteger('tutor')->nullable();
            $table->foreign('tutor')->references('id')->on('users')->onDelete('set null');

            $table->rememberToken();
            $table->timestamps();
        });

        DB::table('users')->insert([
            'nom' => 'admin',
            'mail' => 'admin',
            'password' => bcrypt('admin'),
            'verificat' => true,
            'tutor' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
     
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
