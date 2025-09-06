<?php

namespace App\Http\Middleware;

use App\Exceptions\WrongShopException;
use Closure;
use Illuminate\Http\Request;

class EnforceShopScope
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        $header = $request->header('X-Shop-Id');

        if ($header && $user && $user->shop_id && (int)$header !== (int)$user->shop_id) {
            throw new WrongShopException();
        }
        return $next($request);
    }
}
