<?php
namespace App\Http\Controllers\Storefront;
use App\Http\Controllers\Controller;
use App\Models\{Order, Payment};
use Illuminate\Http\Request;


class PaymentController extends Controller
{
public function init(Request $request, Order $order){
$data = $request->validate(['provider'=>'required|in:cod,sslcommerz,bkash,nagad']);
$p = Payment::create(['order_id'=>$order->id,'provider'=>$data['provider'],'amount'=>$order->grand_total,'status'=>'initiated']);
if ($data['provider']==='cod'){
return response()->json(['data'=>['payment_id'=>$p->id,'next'=>'order-status']]);
}
return response()->json(['data'=>['payment_id'=>$p->id,'redirect_url'=>'<provider_redirect_here>']]);
}
public function webhook(Request $request, string $provider){ return response()->json(['ok'=>true]); }
}