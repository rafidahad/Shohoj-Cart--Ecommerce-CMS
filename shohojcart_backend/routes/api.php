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

use App\Http\Controllers\Storefront\{CartController, CheckoutController, StorefrontProductController, CouponController, AddressController, PaymentController};


// Public storefront browsing
Route::get('shops/slug/{slug}/storefront', [StorefrontProductController::class, 'shopBySlug']);
Route::get('shops/{shop}/storefront/products', [StorefrontProductController::class, 'list']);
Route::get('shops/{shop}/storefront/products/{product:slug}', [StorefrontProductController::class, 'show']);


// Guest carts (token-based)
Route::post('carts', [CartController::class, 'create']);
Route::get('carts/{cart}', [CartController::class, 'show']);
Route::post('carts/{cart}/items', [CartController::class, 'addItem']); // product_id or combo_id
Route::patch('carts/{cart}/items/{item}', [CartController::class, 'updateQty']);
Route::delete('carts/{cart}/items/{item}', [CartController::class, 'removeItem']);


// Addresses for guest checkout
Route::post('addresses', [AddressController::class, 'store']);


// Coupons (optional)
Route::post('carts/{cart}/apply-coupon', [CouponController::class, 'apply']);
Route::delete('carts/{cart}/remove-coupon', [CouponController::class, 'remove']);


// Checkout & payments
Route::post('checkout', [CheckoutController::class, 'checkout']);
Route::get('orders/{order}', [CheckoutController::class, 'status']);
Route::post('payments/{order}/init', [PaymentController::class, 'init']); // provider: cod|sslcommerz|bkash|nagad
Route::post('payments/webhook/{provider}', [PaymentController::class, 'webhook']);


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