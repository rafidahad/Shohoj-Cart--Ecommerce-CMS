<?php

namespace App\Support;

trait ApiResponse
{
    protected function ok($data = [], int $code = 200)
    { return response()->json(['ok' => true, 'data' => $data], $code); }

    protected function created($data = [], int $code = 201)
    { return response()->json(['ok' => true, 'data' => $data], $code); }

    protected function fail(string $message, int $code = 400, $errors = null, $traceId = null)
    {
        $payload = ['ok' => false, 'message' => $message];
        if ($errors)  $payload['errors'] = $errors;
        if ($traceId) $payload['trace_id'] = $traceId;
        return response()->json($payload, $code);
    }
}
