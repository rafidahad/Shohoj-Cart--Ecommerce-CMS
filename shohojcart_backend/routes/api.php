<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;

// -------- Public, non-auth endpoints --------

// If you want products to be public, keep this outside auth; otherwise move it under auth+sanc.
Route::apiResource('products', ProductController::class)->only(['index','show']);

// Public shop read endpoints (MUST be top-level, not under /auth)
// Public read endpoints
Route::get('shops/slug/{slug}', [ShopController::class, 'showBySlug']);
Route::get('shops/{shop}',       [ShopController::class, 'show']);

// (optional) public browsing
Route::get('shops/{shop}/products', [ProductController::class, 'byShop']);
Route::get('shops/{shop}/products/{product:slug}', [ProductController::class, 'showByShopAndSlug']);

// -------- Public auth --------
Route::prefix('auth')->group(function () {
    Route::post('register',        [AuthController::class, 'register']);
    Route::post('login',           [AuthController::class, 'login'])->middleware('throttle:login');
    Route::post('forgot-password', [PasswordController::class, 'sendLink']);
    Route::post('reset-password',  [PasswordController::class, 'reset']);
});

// -------- Email verification (authenticated) --------
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/email/verification-notification', EmailVerificationNotificationController::class)
        ->middleware('throttle:6,1')->name('verification.send');

    Route::get('/email/verify-prompt', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed'])
        ->name('verification.verify');
});

// -------- Protected auth (do NOT require 'shop' for /auth/me) --------
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('auth/me',          [AuthController::class, 'me']);        // no 'shop' middleware here
    Route::post('auth/logout',     [AuthController::class, 'logout']);
    Route::post('auth/logout-all', [AuthController::class, 'logoutAll']);
});

// -------- Shop-scoped protected actions --------
Route::middleware(['auth:sanctum', 'shop'])->group(function () {
    Route::post('shops', [ShopController::class, 'store']);               // create shop
    Route::post('shops/{shop}/attach-owner', [ShopController::class, 'attachOwner']);
    // Put any write routes here (create/update products, etc.)
});
