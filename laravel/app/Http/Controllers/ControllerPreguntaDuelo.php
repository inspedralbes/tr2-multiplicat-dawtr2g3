<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pregunta_duelo;

class ControllerPreguntaDuelo extends Controller
{
    public function index(){
        //$preguntas = pregunta_duelo::all();
        $pregunta = pregunta_duelo::inRandomOrder()->get();

        return $pregunta;
    }
}
