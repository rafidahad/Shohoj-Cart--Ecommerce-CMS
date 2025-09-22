<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Cart extends Model
{
protected $fillable = ['shop_id','customer_id','session_token'];
public function items(){ return $this->hasMany(CartItem::class); }
public function shop(){ return $this->belongsTo(Shop::class); }
public function getSubtotalAttribute(){ return $this->items->sum(fn($i)=> (float)$i->unit_price * (int)$i->qty); }
}