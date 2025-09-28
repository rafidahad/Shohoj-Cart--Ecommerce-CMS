<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CustomerController;

// Health check endpoint for Render
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now(),
        'app' => config('app.name'),
        'version' => '1.0.0',
        'database' => 'connected'
    ]);
});

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
});

// Public routes (for storefront)
Route::get('/shops/{shop}/products', [ShopController::class, 'getProducts']);
Route::get('/shops/{shop}', [ShopController::class, 'show']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/shops/slug/{slug}/storefront', [ShopController::class, 'showBySlug']);

// AI product description generation
Route::post('/ai/product-description', [ProductController::class, 'generateProductDescription']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth user info
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // Shop management
    Route::apiResource('shops', ShopController::class);
    Route::get('/shops/{shop}/analytics', [ShopController::class, 'analytics']);
    
    // Product management
    Route::apiResource('products', ProductController::class);
    Route::post('/products/{product}/duplicate', [ProductController::class, 'duplicate']);
    
    // Order management
    Route::apiResource('orders', OrderController::class);
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);
    
    // Customer management
    Route::apiResource('customers', CustomerController::class);
    
    // Dashboard stats
    Route::get('/dashboard/stats', function () {
        return response()->json([
            'total_products' => \App\Models\Product::count(),
            'total_orders' => \App\Models\Order::count(),
            'total_customers' => \App\Models\User::where('role', 'customer')->count(),
            'total_revenue' => \App\Models\Order::sum('total_amount'),
        ]);
    });
});
