<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\AiController;

/*
|--------------------------------------------------------------------------
| Public, read-only endpoints
|--------------------------------------------------------------------------
*/

// Products (public read)
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{product}', [ProductController::class, 'show']);

// Shops (public read)
Route::get('shops/slug/{slug}', [ShopController::class, 'showBySlug']);
Route::get('shops/{shop}',       [ShopController::class, 'show']);

// Shop browsing (public read)
Route::get('shops/{shop}/products',                        [ProductController::class, 'byShop']);
Route::get('shops/{shop}/products/{product:slug}',         [ProductController::class, 'showByShopAndSlug']);

/*
|--------------------------------------------------------------------------
| Public auth
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {
    Route::post('register',        [AuthController::class, 'register']);
    Route::post('login',           [AuthController::class, 'login'])->middleware('throttle:login');
    Route::post('forgot-password', [PasswordController::class, 'sendLink']);
    Route::post('reset-password',  [PasswordController::class, 'reset']);
});

/*
|--------------------------------------------------------------------------
| Authenticated routes (Sanctum)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum'])->group(function () {
    // Auth user ops
    Route::get('auth/me',          [AuthController::class, 'me']);
    Route::post('auth/logout',     [AuthController::class, 'logout']);
    Route::post('auth/logout-all', [AuthController::class, 'logoutAll']);

    // AI
    Route::post('ai/product-description', [AiController::class, 'productDescription']);

    // Shop create (must NOT require 'shop' middleware; user may not have a shop yet)
    Route::post('shops', [ShopController::class, 'store']);

    // Attach owner to an existing shop (optionally protect with your 'shop' middleware if it enforces ownership)
    Route::post('shops/{shop}/attach-owner', [ShopController::class, 'attachOwner']);

    // Product write operations (now POST is allowed)
    Route::post('products',                 [ProductController::class, 'store']);
    Route::put('products/{product}',        [ProductController::class, 'update']);
    Route::delete('products/{product}',     [ProductController::class, 'destroy']);

    // Email verification helpers
    Route::post('email/verification-notification', EmailVerificationNotificationController::class)
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('email/verify-prompt', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed'])
        ->name('verification.verify');
});
