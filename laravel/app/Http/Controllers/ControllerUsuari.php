<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ControllerUsuari extends Controller
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
            'mail' => 'required|string|unique:users,mail',
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
            'nom' => 'required|string|unique:users,nom',
        ]);
        //El nom ja està en ús
        if ($validator->fails()) {
            $response = [
                'error' => 3,
                'missatge' => 'Nom ja esta en ús'
            ];
            return (json_encode($response));
        }

        $user = User::create([
            'nom' => $request->nom,
            'mail' => $request->mail,
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
            'nom' => 'required|string',
            'password' => 'required|string'

        ]);

        $user = User::where('nom', $fields['nom'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {

            $response = [
                'missatge' => 'El nom o la contrasenya no són correctes',
                'status' => 401,
            ];
            return response($response, 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
            'status' => 201,

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


