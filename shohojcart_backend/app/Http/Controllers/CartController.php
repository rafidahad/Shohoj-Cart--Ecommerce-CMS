<?php
namespace App\Http\Controllers\Storefront;
use App\Http\Controllers\Controller;
use App\Models\{Cart, CartItem, Product, Shop, Combo};
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;


class CartController extends Controller
{
public function create(Request $request){
$data = $request->validate(['shop_id'=>'required|exists:shops,id']);
$token = Str::random(40);
$cart = Cart::create(['shop_id'=>$data['shop_id'],'session_token'=>$token]);
return response()->json(['data'=>$cart->load('items')]);
}


public function show(Cart $cart){
return response()->json(['data'=>$cart->load(['items.product'])]);
}


public function addItem(Request $request, Cart $cart){
$data = $request->validate([
'product_id' => 'nullable|exists:products,id',
'combo_id' => 'nullable|exists:combos,id',
'qty' => 'nullable|integer|min:1|max:999',
'quantity' => 'nullable|integer|min:1|max:999', // frontend alias
'payload' => 'nullable|array',
]);
$qty = (int)($data['qty'] ?? $data['quantity'] ?? 1);
if (empty($data['product_id']) === empty($data['combo_id'])) {
throw ValidationException::withMessages(['product_id'=>'Provide either product_id or combo_id']);
}


if (!empty($data['product_id'])) {
$product = Product::findOrFail($data['product_id']);
if ($product->shop_id !== $cart->shop_id) throw ValidationException::withMessages(['product_id'=>'Cross-shop item']);
$unit = (float)$product->sell_price;
$item = CartItem::updateOrCreate(
['cart_id'=>$cart->id, 'product_id'=>$product->id, 'combo_id'=>null],
['qty'=>$qty, 'unit_price'=>$unit, 'payload_json'=>$data['payload'] ?? null]
);
} else {
$combo = Combo::findOrFail($data['combo_id']);
if ($combo->shop_id !== $cart->shop_id) throw ValidationException::withMessages(['combo_id'=>'Cross-shop item']);
$unit = (float)($combo->price ?? 0);
$item = CartItem::updateOrCreate(
['cart_id'=>$cart->id, 'product_id'=>null, 'combo_id'=>$combo->id],
['qty'=>$qty, 'unit_price'=>$unit, 'payload_json'=>$data['payload'] ?? null]
);
}


return response()->json(['data'=>$item->load('product'),'cart'=>$cart->fresh('items.product')]);
}


public function updateQty(Request $request, Cart $cart, CartItem $item){
abort_if($item->cart_id !== $cart->id, 404);
$qty = max(0,(int)($request->integer('qty') ?: $request->integer('quantity')));
if ($qty === 0) { $item->delete(); }
else { $item->qty = $qty; $item->save(); }
return response()->json(['data'=>$cart->fresh('items.product')]);
}


public function removeItem(Cart $cart, CartItem $item){
abort_if($item->cart_id !== $cart->id, 404);
$item->delete();
return response()->json(['data'=>$cart->fresh('items.product')]);
}
}