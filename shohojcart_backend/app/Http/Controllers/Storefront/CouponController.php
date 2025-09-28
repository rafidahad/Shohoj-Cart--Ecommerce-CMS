<?php
namespace App\Http\Controllers\Storefront;
use App\Http\Controllers\Controller;
use App\Models\{Cart, Coupon, CouponRedemption};
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;


class CouponController extends Controller
{
public function apply(Request $request, Cart $cart){
$data = $request->validate(['code'=>'required|string']);
$coupon = Coupon::where('code',$data['code'])->where('shop_id',$cart->shop_id)->first();
if (!$coupon) throw ValidationException::withMessages(['code'=>'Invalid coupon']);
// TODO: window, min order, usage caps…
CouponRedemption::create(['coupon_id'=>$coupon->id,'cart_id'=>$cart->id,'redeemed_at'=>now()]);
return response()->json(['data'=>['applied'=>true,'code'=>$coupon->code]]);
}
public function remove(Cart $cart){
CouponRedemption::where('cart_id',$cart->id)->delete();
return response()->json(['data'=>['removed'=>true]]);
}
}