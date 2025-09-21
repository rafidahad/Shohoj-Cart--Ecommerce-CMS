<?php

return [
    // API key for Steadfast Courier
    'api_key' => env('STEADFAST_API_KEY', ''),

    // Base URL for API endpoints
    'base_url' => env('STEADFAST_BASE_URL', 'https://portal.steadfast.com.bd/api/v1'),

    // Default origin address for shipments
    'default_origin_address' => env('STEADFAST_DEFAULT_ORIGIN_ADDRESS', 'Dhaka, Bangladesh'),
];
