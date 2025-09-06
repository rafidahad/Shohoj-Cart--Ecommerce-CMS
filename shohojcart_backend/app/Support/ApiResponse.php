<?php

namespace App\Support;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    protected function ok($data = null, int $status = 200): JsonResponse
    {
        return response()->json(['ok' => true, 'data' => $data], $status);
    }

    protected function created($data = null): JsonResponse
    {
        return $this->ok($data, 201);
    }

    protected function fail(string $message, int $status = 400, $errors = null): JsonResponse
    {
        $payload = ['ok' => false, 'message' => $message];
        if ($errors) $payload['errors'] = $errors;
        return response()->json($payload, $status);
    }
}
