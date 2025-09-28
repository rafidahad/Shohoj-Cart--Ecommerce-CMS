<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class OrderItem extends Model
{
protected $fillable = ['order_id','product_id','combo_id','qty','unit_price','line_total','payload_json'];
protected $casts = ['payload_json' => 'array'];
public function order(){ return $this->belongsTo(Order::class); }
public function product(){ return $this->belongsTo(Product::class); }
}