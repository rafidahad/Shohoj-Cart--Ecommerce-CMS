<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;

// Public auth
Route::prefix('auth')->group(function () {
    Route::post('register',        [AuthController::class, 'register']);
    Route::post('login',           [AuthController::class, 'login'])->middleware('throttle:login');
    Route::post('forgot-password', [PasswordController::class, 'sendLink']);
    Route::post('reset-password',  [PasswordController::class, 'reset']);
});

// Email verification (authenticated)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/email/verification-notification', EmailVerificationNotificationController::class)
        ->middleware('throttle:6,1')->name('verification.send');

    Route::get('/email/verify-prompt', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed'])
        ->name('verification.verify');
});

// Protected auth
Route::middleware(['auth:sanctum','shop'])->group(function () {
    Route::get('auth/me',          [AuthController::class, 'me']);
    Route::post('auth/logout',     [AuthController::class, 'logout']);
    Route::post('auth/logout-all', [AuthController::class, 'logoutAll']);
});
