<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Named limiter used by throttle:login
RateLimiter::for('login', function (Request $request) {
    $key = 'login:' . ($request->input('login') ?? $request->ip());
    return [ Limit::perMinute(5)->by($key) ];
});


RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->ip());
});

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
