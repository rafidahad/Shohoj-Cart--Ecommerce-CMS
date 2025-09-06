<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [];

    public function boot(): void
    {
        RateLimiter::for('login', function (Request $request) {
            $key = 'login|' . strtolower((string)$request->input('login')) . '|' . $request->ip();
            return [
                Limit::perMinute(5)->by($key),       // username+IP
                Limit::perMinute(20)->by($request->ip()), // global per IP
            ];
        });
    }
}
