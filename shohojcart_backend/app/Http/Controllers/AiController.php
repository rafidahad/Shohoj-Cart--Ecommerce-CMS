<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Services\GeminiService;
use Illuminate\Http\Request;

class AiController extends Controller
{
    public function __construct(private GeminiService $gemini) {}

    public function productDescription(Request $r)
    {
        $data = $r->validate([
            'shop_id' => 'required|exists:shops,id',
            'title'   => 'nullable|string|max:191',
            'brief'   => 'nullable|string|max:2000',
        ]);

        $user = $r->user();
        // Optional: ensure user is operating on their own shop (adjust logic if multi-shop)
        if ($user?->shop_id && (int)$user->shop_id !== (int)$data['shop_id']) {
            return response()->json(['message' => 'Forbidden for this shop'], 403);
        }

        $shop = Shop::findOrFail($data['shop_id']);

        $prompt = $this->buildPrompt($shop->name, $data['title'] ?? '', $data['brief'] ?? '');

        try {
            $text = $this->gemini->generate($prompt);
            return response()->json(['text' => $text]);
        } catch (\Throwable $e) {
            report($e);
            return response()->json(['message' => 'AI generation failed'], 500);
        }
    }

    private function buildPrompt(string $shopName, string $title, string $brief): string
    {
        $parts = [];
        $parts[] = "You are a copywriter for an ecommerce shop named '{$shopName}'.";
        $parts[] = "Write a concise, persuasive product description in English for the online store.";
        if ($title) $parts[] = "Product title: {$title}.";
        if ($brief) $parts[] = "Extra notes from merchant: {$brief}.";
        $parts[] = "Use 2–4 short paragraphs with clear benefits, features, and a friendly tone. Avoid hallucinations.";
        return implode(" ", $parts);
    }
}
