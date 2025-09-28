<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Order extends Model
{
protected $fillable = ['shop_id','customer_id','number','status','subtotal','discount_total','shipping_total','tax_total','grand_total','payment_status','billing_address_id','shipping_address_id','placed_at'];
protected $dates = ['placed_at'];
public function items(){ return $this->hasMany(OrderItem::class); }
public function shippingAddress(){ return $this->belongsTo(Address::class,'shipping_address_id'); }
public function billingAddress(){ return $this->belongsTo(Address::class,'billing_address_id'); }
}
