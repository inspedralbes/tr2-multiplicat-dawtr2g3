<?php

namespace App\Http\Controllers;

use App\Models\Pregunta;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\User;
use Validator;
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

    public function show(Request $request)
    {
        $pregunta = Pregunta::find($request->id);

        if (!$pregunta) {
            return response()->json(['message' => 'Pregunta no encontrada'], 404);
        }

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
    public function crearPregunta(Request $request)
    {
        $v = Validator::make($request->all(), [
            'enunciat' => 'required',
            'tipus' => 'required',
            'dificultat' => 'required',
            'respostes' => 'required',
            'categoria' => 'required',
            'temps' => 'required',
            'token' => 'required'
        ]);

        if ($v->fails()) {
            return response()->json(['message' => 'Falten camps', 'status' => 401], 400);
        } else {

            $checkToken = $request->token;
            if (!($checkToken == null || $checkToken == "" || $checkToken == "null")) {

                //Return if the user is logged in or not from the token
                [$id, $token] = explode('|', $checkToken, 2);
                $id = ltrim($id, '{');
                $token = rtrim($token, '}');



                $accessToken = PersonalAccessToken::find($id);
                if ($accessToken) {
                    if (hash_equals($accessToken->token, hash('sha256', $token))) {
                        $userId = $accessToken->tokenable_id;
                        $user = User::find($userId);
                        if ($user->verificat == 1) {
                            $pregunta = new Pregunta();
                            $pregunta->enunciat = $request->enunciat;
                            $pregunta->tipus = $request->tipus;
                            $pregunta->dificultat = $request->dificultat;
                            $pregunta->respostes = $request->respostes;
                            $pregunta->categoria = $request->categoria;
                            $pregunta->temps = $request->temps;
                            $pregunta->save();
                            return response()->json(['message' => 'Pregunta creada', 'status' => 200], 201);
                        } else {
                            return response()->json(['message' => 'Usuari no verificat',  'status' => 401], 401);
                        }
                    }
                } else {
                    return response()->json(['message' => 'Sessio expirada', 'status' => 404], 404);
                }
            } else {
                return response()->json(['message' => 'Token no proporcionat', 'status' => 404], 404);
            }
        }
    }
}
