<?php
// app/Models/Product.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // If your table is not "products", set the table name:
    // protected $table = 'products';

    // Add/adjust fields based on your schema
    protected $fillable = [
        'shop_id', 'name', 'slug',
        'price',      // <- keep generic price
        'sell_price', // <- optional; ok if null / missing in DB
        'status',
        'description',
        'sku',
        'stock',
        'image',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}
