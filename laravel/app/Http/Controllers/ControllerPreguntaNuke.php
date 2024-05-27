<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pregunta_nuke;

class ControllerPreguntaNuke extends Controller
{
    public function index(){
        $pregunta = pregunta_nuke::inRandomOrder()->first();

        return $pregunta;
    }
}
