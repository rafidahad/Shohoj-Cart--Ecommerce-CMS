<?php
namespace App\Http\Controllers\Storefront;
use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;


class AddressController extends Controller
{
public function store(Request $request){
$data = $request->validate([
'customer_id' => 'nullable|exists:customers,id',
'name' => 'required|string|max:120',
'phone' => 'nullable|string|max:24',
'line1' => 'required|string|max:180',
'line2' => 'nullable|string|max:180',
'city' => 'nullable|string|max:120',
'postcode' => 'nullable|string|max:20',
'country' => 'nullable|string|max:2',
]);
$addr = Address::create($data);
return response()->json(['data'=>$addr]);
}
}