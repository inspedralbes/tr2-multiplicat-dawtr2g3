<?php

namespace App\Http\Controllers;

use App\Mail\Verificacio;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\PersonalAccessToken;


class ControllerUsuari extends Controller
{
    public function register(Request $request)
    {
        if ($request->nom == 'undefined' || $request->mail == 'undefined' || $request->password == 'undefined' || $request->tutor == 'undefined') {
            $response = [
                'status' => 399,
                'missatge' => 'Falten camps per omplir'
            ];
            return response($response, 399);
        }
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|confirmed'
        ]);
        //La contrasenya i la confirmació no coincideixen
        if ($validator->fails()) {
            $response = [
                'status' => 399,
                'missatge' => 'Comprova que la contrasenya i la confirmació siguin la mateixa'
            ];
            return response($response, 399);
        }

        $validator = Validator::make($request->all(), [
            'mail' => 'required|string|unique:users,mail',
        ]);
        //El mail ja està en ús
        if ($validator->fails()) {
            $response = [
                'status' => 340,

                'missatge' => 'Email ja esta en ús'
            ];
            return response($response, 340);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|unique:users,nom',
        ]);
        //El nom ja està en ús
        if ($validator->fails()) {
            $response = [
                'error' => 340,
                'missatge' => 'Nom ja esta en ús'
            ];
            return response($response, 340);
        }

        $user = User::create([
            'nom' => $request->nom,
            'mail' => $request->mail,
            'password' => bcrypt($request->password),
            'tutor' => $request->tutor,
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;
        /** $mail = new Verificacio($user); Mail::to('admin@mathroyale.daw.inspedralbes.cat')->send($mail);
         */

        unset($user->password);
        $response = [
            'user' => $user,
            'token' => $token,
            'status' => 201,
        ];
        return response($response, 201);
    }
    public function checkToken(Request $request)
    {
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
                    $response = [
                        'message' => 'Usuari loguejat',
                        'user' => $user,
                        'status' => 200,
                    ];
                    return (json_encode($response));
                }
            } else {
                $response = [
                    'message' => 'Sessió caducada',
                    'status' => 401,
                ];
                return (json_encode($response));
            }
        } else {


            $response = [
                'message' => 'Usuari no loguejat',
                'status' => 401,
            ];
            return (json_encode($response));
        }
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
                    DB::table('personal_access_tokens')->where('tokenable_id', '=', $userId)->delete();
                    return $userId;
                }
            }
        }
        $response = [
            'message' => 'Log out fet',
            'status' => 200,
        ];

        return (json_encode($response));
    }
}
