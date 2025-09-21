<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailVerificationPromptController extends Controller
{
    public function __invoke(Request $request)
    {
        return response()->json([
            'ok'       => true,
            'verified' => $request->user()->hasVerifiedEmail(),
            'message'  => $request->user()->hasVerifiedEmail()
                ? 'Email already verified.'
                : 'Email verification required.',
        ]);
    }
}
