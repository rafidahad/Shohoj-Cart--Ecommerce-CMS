<?php
namespace App\Http\Controllers\Storefront;
use App\Http\Controllers\Controller;
use App\Models\{Cart, Order, OrderItem, Product, Address};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;


class CheckoutController extends Controller
{
public function checkout(Request $request)
{
$data = $request->validate([
'cart_id' => 'nullable|exists:carts,id',
'buy_now' => 'boolean',
'product_id' => 'nullable|exists:products,id',
'combo_id' => 'nullable|exists:combos,id',
'qty' => 'nullable|integer|min:1|max:999',
'billing_address_id' => 'nullable|exists:addresses,id',
'shipping_address_id' => 'nullable|exists:addresses,id',
'shipping_name' => 'nullable|string|max:120',
'shipping_line1' => 'nullable|string|max:180',
'shipping_city' => 'nullable|string|max:120',
'shipping_postcode' => 'nullable|string|max:20',
'phone' => 'nullable|string|max:24',
'email' => 'nullable|email',
]);


return DB::transaction(function () use ($data) {
$lines = []; $shopId = null;


if (!empty($data['buy_now'])) {
$qty = (int)($data['qty'] ?? 1);
$p = Product::findOrFail($data['product_id']);
$shopId = $p->shop_id; $unit=(float)$p->sell_price;
$lines[]=['product_id'=>$p->id,'combo_id'=>null,'qty'=>$qty,'unit'=>$unit];
} else {
$cart = Cart::with('items.product')->findOrFail($data['cart_id']);
$shopId = $cart->shop_id;
foreach ($cart->items as $ci) {
$lines[]=[
'product_id'=>$ci->product_id,
'combo_id'=>$ci->combo_id,
'qty'=>$ci->qty,
'unit'=>(float)$ci->unit_price,
];
}
}


$subtotal = collect($lines)->sum(fn($l)=>$l['qty']*$l['unit']);
$discount=0; $shipping=0; $tax=0; $grand = $subtotal - $discount + $shipping + $tax;


$shippingAddressId = $data['shipping_address_id'] ?? null;
if (!$shippingAddressId && !empty($data['shipping_name']) && !empty($data['shipping_line1'])) {
$shippingAddressId = Address::create([
'name'=>$data['shipping_name'], 'line1'=>$data['shipping_line1'], 'city'=>$data['shipping_city'] ?? null,
'postcode'=>$data['shipping_postcode'] ?? null, 'phone'=>$data['phone'] ?? null
])->id;
}


$order = Order::create([
'shop_id'=>$shopId,
'customer_id'=>null,
'number'=>'SC-'.Str::upper(Str::random(8)),
'status'=>'pending',
'payment_status'=>'pending',
'subtotal'=>$subtotal,
'discount_total'=>$discount,
'shipping_total'=>$shipping,
'tax_total'=>$tax,
'grand_total'=>$grand,
'billing_address_id'=>$data['billing_address_id'] ?? null,
'shipping_address_id'=>$shippingAddressId,
'placed_at'=>Carbon::now(),
]);


foreach ($lines as $l){
OrderItem::create([
'order_id'=>$order->id,
'product_id'=>$l['product_id'] ?? null,
'combo_id'=>$l['combo_id'] ?? null,
'qty'=>$l['qty'],
'unit_price'=>$l['unit'],
'line_total'=>$l['unit']*$l['qty'],
]);
}


if (!empty($data['cart_id'])) { $cart->items()->delete(); $cart->delete(); }
return response()->json(['data'=>$order->load('items.product')]);
});
}


public function status(Order $order){ return response()->json(['data'=>$order->load('items.product')]); }
}