<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Validation\ValidationException;
use Throwable;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class Handler extends ExceptionHandler
{
    protected $dontReport = [
        // add exceptions you don't want to report
    ];

    public function register(): void
    {
        // Validation (422)
        $this->renderable(function (ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ], 422);
            }
        });

        // Unauthenticated (401)
        $this->renderable(function (AuthenticationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Unauthenticated',
                ], 401);
            }
        });

        // Forbidden/authorization (403)
        $this->renderable(function (AuthorizationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'ok' => false,
                    'message' => $e->getMessage() ?: 'Forbidden',
                ], 403);
            }
        });

        // Not found models (404)
        $this->renderable(function (ModelNotFoundException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Resource not found',
                ], 404);
            }
        });

        // Rate limits (429)
        $this->renderable(function (ThrottleRequestsException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'ok' => false,
                    'message' => 'Too many attempts. Please try again later.',
                ], 429);
            }
        });

        // Database errors (sanitize) (500)
        $this->renderable(function (QueryException $e, $request) {
            if ($request->expectsJson()) {
                $traceId = (string) Str::uuid();
                logger()->error('db.error', ['trace_id' => $traceId, 'sql' => $e->getSql(), 'bindings' => $e->getBindings(), 'error' => $e->getMessage()]);
                return response()->json([
                    'ok' => false,
                    'message' => 'Internal server error',
                    'trace_id' => $traceId,
                ], 500);
            }
        });

        // Domain: inactive account / wrong shop
        $this->renderable(function (InactiveAccountException|WrongShopException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'ok' => false,
                    'message' => $e->getMessage(),
                ], $e->getCode() ?: 403);
            }
        });

        // Fallback for any other Throwable
        $this->renderable(function (Throwable $e, $request) {
            if ($request->expectsJson()) {
                $status = $e instanceof HttpExceptionInterface ? $e->getStatusCode() : 500;
                $traceId = (string) Str::uuid();
                logger()->error('app.error', ['trace_id' => $traceId, 'exception' => $e]);
                return response()->json([
                    'ok' => false,
                    'message' => $status === 500 ? 'Internal server error' : $e->getMessage(),
                    'trace_id' => $traceId,
                ], $status);
            }
        });
    }
}
