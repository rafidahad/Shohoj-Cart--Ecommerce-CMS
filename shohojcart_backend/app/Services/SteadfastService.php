<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SteadfastService
{
    /**
     * Base URL for Steadfast API
     *
     * @var string
     */
    protected $baseUrl;

    /**
     * API Key for authenticating requests
     *
     * @var string
     */
    protected $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('steadfast.base_url');
        $this->apiKey = config('steadfast.api_key');
    }

    /**
     * Calculate shipping cost based on weight and destination.
     *
     * @param array $data
     * @return array
     */
    public function calculateShippingCost(array $data)
    {
        // Endpoint for shipping cost calculation (if available in API)
        // Note: Steadfast may use a flat rate, adjust accordingly
        return [
            'success' => true,
            'cost' => 100, // Placeholder fixed cost in BDT
            'message' => 'Calculated using default rate.'
        ];
    }

    /**
     * Create an order/shipment in Steadfast system.
     *
     * @param array $orderData
     * @return array
     */
    public function createOrder(array $orderData)
    {
        $response = Http::withHeaders([
            'API-KEY' => $this->apiKey,
            'Accept' => 'application/json',
        ])->post($this->baseUrl . '/create-order', $orderData);

        if ($response->successful()) {
            return [
                'success' => true,
                'data' => $response->json(),
            ];
        }

        return [
            'success' => false,
            'message' => $response->json('message') ?? 'Failed to create order',
        ];
    }

    /**
     * Track shipment status.
     *
     * @param string $trackingId
     * @return array
     */
    public function trackOrder(string $trackingId)
    {
        $response = Http::withHeaders([
            'API-KEY' => $this->apiKey,
            'Accept' => 'application/json',
        ])->get($this->baseUrl . '/track-order/' . $trackingId);

        if ($response->successful()) {
            return [
                'success' => true,
                'data' => $response->json(),
            ];
        }

        return [
            'success' => false,
            'message' => $response->json('message') ?? 'Failed to track order',
        ];
    }
}
