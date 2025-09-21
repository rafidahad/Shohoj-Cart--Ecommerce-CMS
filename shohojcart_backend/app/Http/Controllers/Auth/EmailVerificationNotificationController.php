<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['ok'=>true,'message'=>'Email already verified.']);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['ok'=>true,'message'=>'Verification link sent.'], 202);
    }
}
