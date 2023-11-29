<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuari;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|unique:users,nom',
            'password' => 'required|string|confirmed'
        ]);
        //La contrasenya i la confirmació no coincideixen
        if ($validator->fails()) {
            $response = [
                'error' => 1,
                'missatge' => 'Comprova que la contrasenya i la confirmació siguin la mateixa'
            ];
            return (json_encode($response));
        }

        $validator = Validator::make($request->all(), [
            'mail' => 'required|string|unique:usuaris,mail',
        ]);
        //El mail ja està en ús
        if ($validator->fails()) {
            $response = [
                'error' => 2,
                'missatge' => 'Email ja esta en ús'
            ];
            return (json_encode($response));
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|unique:usuaris,nom',
        ]);
        //El nom ja està en ús
        if ($validator->fails()) {
            $response = [
                'error' => 3,
                'missatge' => 'Nom ja esta en ús'
            ];
            return (json_encode($response));
        }

        $user = Usuari::create([
            'nom' => $request->name,
            'email' => $request->mail,
            'password' => bcrypt($request->password),
            'tutor' => $request->tutor,
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'usuari' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'mail' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = Usuari::where('mail', $fields['mail'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response('Credencials no valides', 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Log out fet'
        ];
    }
}


