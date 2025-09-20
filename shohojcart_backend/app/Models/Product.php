<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'name',
        'slug',
        'sku',
        'status',
        'sell_price',
        'sourcing_cost',
        'stock_policy',
        'description',
    ];

    protected $casts = [
        'sell_price'    => 'decimal:2',
        'sourcing_cost' => 'decimal:2',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}