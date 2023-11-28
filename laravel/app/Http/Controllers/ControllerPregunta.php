<?php

namespace App\Http\Controllers;

use App\Models\Pregunta;
use Illuminate\Http\Request;

class ControllerPregunta extends Controller
{
    public function index()
    {
        $preguntas = Pregunta::all();
        return response()->json($preguntas);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);

        $pregunta = Pregunta::create($request->all());

        return response()->json($pregunta, 201);
    }

    public function show(Pregunta $pregunta)
    {
        return response()->json($pregunta);
    }

    public function update(Request $request, Pregunta $pregunta)
    {
        $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);

        $pregunta->update($request->all());

        return response()->json($pregunta);
    }

    public function destroy(Pregunta $pregunta)
    {
        $pregunta->delete();

        return response()->json(null, 204);
    }
}
