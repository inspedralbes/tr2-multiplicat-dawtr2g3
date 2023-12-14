<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControllerPregunta;
use App\Http\Controllers\ControllerUsuari;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login',[ControllerUsuari::class, 'login']); 
Route::post('/register',[ControllerUsuari::class, 'register']); 

Route::get('/preguntes',[ControllerPregunta::class, 'index']); 
Route::get('/preguntes/{id}',[ControllerPregunta::class, 'show']); 