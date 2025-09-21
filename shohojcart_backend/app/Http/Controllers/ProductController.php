<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * List all products
     */
    public function index()
    {
        $products = Product::with('shop')->get();
        return response()->json($products);
    }

    /**
     * Create a new product
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shop_id'       => 'required|exists:shops,id',
            'name'          => 'required|string|max:191',
            'slug'          => 'required|string|max:191',
            'sku'           => 'nullable|string|max:64|unique:products,sku',
            'status'        => 'in:draft,published,archived',
            'sell_price'    => 'numeric|min:0',
            'sourcing_cost' => 'numeric|min:0',
            'stock_policy'  => 'in:derive,manual',
            'description'   => 'nullable|string',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    /**
     * Show a single product
     */
    public function show($id)
    {
        $product = Product::with('shop')->find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    /**
     * Update a product
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validated = $request->validate([
            'name'          => 'sometimes|required|string|max:191',
            'slug'          => 'sometimes|required|string|max:191',
            'sku'           => 'nullable|string|max:64|unique:products,sku,' . $id,
            'status'        => 'in:draft,published,archived',
            'sell_price'    => 'numeric|min:0',
            'sourcing_cost' => 'numeric|min:0',
            'stock_policy'  => 'in:derive,manual',
            'description'   => 'nullable|string',
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    /**
     * Delete a product
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
