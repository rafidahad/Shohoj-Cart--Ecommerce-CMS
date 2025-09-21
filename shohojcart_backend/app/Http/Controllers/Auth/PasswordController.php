<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password as PwdRule;

class PasswordController extends Controller
{
    public function sendLink(Request $r)
    {
        $r->validate(['email' => 'required|email']);
        $status = Password::sendResetLink($r->only('email'));
        return response()->json(['ok'=>true,'message'=>__($status)]);
    }

    public function reset(Request $r)
    {
        $data = $r->validate([
            'token'    => 'required',
            'email'    => 'required|email',
            'password' => ['required', PwdRule::min(8)->letters()->mixedCase()->numbers()->uncompromised()],
        ]);

        $status = Password::reset($data, function ($user, $password) {
            $user->forceFill(['password' => Hash::make($password)])->save();
            $user->tokens()->delete();
        });

        return response()->json(['ok'=>true,'message'=>__($status)]);
    }
}
