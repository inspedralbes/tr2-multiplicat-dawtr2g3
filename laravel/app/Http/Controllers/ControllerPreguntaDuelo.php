<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pregunta_duelo;

class ControllerPreguntaDuelo extends Controller
{
    public function index(){
        $preguntas = pregunta_duelo::all();
        return $preguntas;
    }
}
