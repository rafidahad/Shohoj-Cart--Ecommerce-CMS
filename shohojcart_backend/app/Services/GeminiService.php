<?php

namespace App\Services;

use GuzzleHttp\Client;

class GeminiService
{
    private Client $http;
    private string $apiKey;
    private string $model;

    public function __construct()
    {
        $this->http  = new Client(['base_uri' => 'https://generativelanguage.googleapis.com/v1beta/']);
        $this->apiKey = config('services.gemini.key', env('GEMINI_API_KEY', ''));
        $this->model  = config('services.gemini.model', 'models/gemini-1.5-flash');
    }

    public function generate(string $prompt, int $maxTokens = 640, float $temperature = 0.7): string
    {
        if (!$this->apiKey) {
            throw new \RuntimeException('GEMINI_API_KEY is not set');
        }

        $resp = $this->http->post($this->model . ':generateContent', [
            'query' => ['key' => $this->apiKey],
            'json'  => [
                'contents' => [[
                    'role'  => 'user',
                    'parts' => [['text' => $prompt]],
                ]],
                'generationConfig' => [
                    'maxOutputTokens' => $maxTokens,
                    'temperature'     => $temperature,
                ],
            ],
            'timeout' => 20,
        ]);

        $data = json_decode((string) $resp->getBody(), true);
        return $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
    }
}
