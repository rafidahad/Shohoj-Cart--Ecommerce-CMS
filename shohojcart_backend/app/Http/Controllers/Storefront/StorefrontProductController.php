<?php
namespace App\Http\Controllers\Storefront;
use App\Http\Controllers\Controller;
use App\Models\{Product, Shop};
use Illuminate\Http\Request;


class StorefrontProductController extends Controller
{
public function shopBySlug(string $slug){
$shop = Shop::where('slug',$slug)->firstOrFail();
return response()->json(['data'=>$shop]);
}
public function list(Request $request, Shop $shop){
$q = Product::query()->where('shop_id',$shop->id)
->where('status','published')
->when($request->filled('search'), function($qq) use ($request){
$s=$request->string('search');
$qq->where(fn($w)=>$w->where('name','like',"%{$s}%").orWhere('slug','like',"%{$s}%").orWhere('sku','like',"%{$s}%"));
})
->orderBy($request->get('sort','name'));
return response()->json(['data'=>$q->paginate($request->integer('per_page',24))]);
}
public function show(Shop $shop, Product $product){
abort_if($product->shop_id !== $shop->id, 404);
return response()->json(['data'=>$product]);
}
}