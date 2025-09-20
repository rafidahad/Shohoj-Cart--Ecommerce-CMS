<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SteadfastService;
use Illuminate\Support\Facades\Log;

class ShippingController extends Controller
{
    protected $steadfast;

    public function __construct(SteadfastService $steadfast)
    {
        $this->steadfast = $steadfast;
    }

    /**
     * Calculate shipping cost
     */
    public function calculateCost(Request $request)
    {
        $validated = $request->validate([
            'weight' => 'required|numeric',
            'destination' => 'required|string',
        ]);

        $result = $this->steadfast->calculateShippingCost($validated);

        return response()->json($result);
    }

    /**
     * Book a shipment with Steadfast when an order is placed
     */
    public function bookShipment(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|integer',
            'recipient_name' => 'required|string',
            'recipient_phone' => 'required|string',
            'recipient_address' => 'required|string',
            'weight' => 'required|numeric',
        ]);

        try {
            $result = $this->steadfast->createOrder($validated);
            return response()->json($result);
        } catch (\Exception $e) {
            Log::error('Steadfast booking error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to book shipment'
            ], 500);
        }
    }
}
