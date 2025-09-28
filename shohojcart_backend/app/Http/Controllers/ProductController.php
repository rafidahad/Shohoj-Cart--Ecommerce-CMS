<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Shop; // ✅ IMPORTANT: import the Shop model
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Schema; // ✅ to guard optional columns

class ProductController extends Controller
{
    /**
     * GET /api/products
     * Optional filters: shop_id, shop_slug, status, q
     */
    public function index(Request $r): JsonResponse
    {
        $q = Product::query()->with('shop');

        // Filter by shop_id or shop_slug (if provided)
        if ($r->filled('shop_id')) {
            $q->where('shop_id', (int) $r->input('shop_id'));
        } elseif ($r->filled('shop_slug')) {
            $shop = Shop::where('slug', $r->input('shop_slug'))->first();
            if (!$shop) {
                return response()->json(['message' => 'Shop not found'], 404);
            }
            $q->where('shop_id', $shop->id);
        }

        // Optional filters
        if ($r->filled('status') && Schema::hasColumn('products', 'status')) {
            $q->where('status', $r->input('status')); // draft|published|archived
        }

        if ($r->filled('q')) {
            $term = '%' . $r->input('q') . '%';
            $q->where(function ($qq) use ($term) {
                $qq->where('name', 'like', $term)
                    ->orWhere('slug', 'like', $term)
                    ->orWhere('sku', 'like', $term);
            });
        }

        return response()->json($q->orderByDesc('id')->paginate(20));
    }

    /**
     * GET /api/shops/{shop}/products
     * Public list for a single shop
     */
    public function byShop(Shop $shop): JsonResponse
    {
        $products = Product::where('shop_id', $shop->id)
            // Guard the optional status column to avoid SQL error
            ->when(Schema::hasColumn('products', 'status'), function ($q) {
                $q->where('status', 'published');
            })
            ->orderByDesc('id')
            ->paginate(20);

        return response()->json($products);
    }

    /**
     * GET /api/shops/{shop}/products/{product:slug}
     * Public single product for a shop by its slug
     */
    public function showByShopAndSlug(Shop $shop, Product $product): JsonResponse
    {
        if ((int) $product->shop_id !== (int) $shop->id) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($product);
    }

    /**
     * POST /api/products
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'shop_id'       => 'required|exists:shops,id',
            'name'          => 'required|string|max:191',
            'slug'          => 'required|string|max:191',
            'sku'           => 'nullable|string|max:64|unique:products,sku',
            'status'        => 'nullable|in:draft,published,archived', // nullable so it won't fail if column missing
            'sell_price'    => 'nullable|numeric|min:0',
            'sourcing_cost' => 'nullable|numeric|min:0',
            'stock_policy'  => 'nullable|in:derive,manual',
            'description'   => 'nullable|string',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    /**
     * GET /api/products/{id}
     */
    public function show($id): JsonResponse
    {
        $product = Product::with('shop')->find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    /**
     * PUT /api/products/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validated = $request->validate([
            'name'          => 'sometimes|required|string|max:191',
            'slug'          => 'sometimes|required|string|max:191',
            'sku'           => 'nullable|string|max:64|unique:products,sku,' . $id,
            'status'        => 'nullable|in:draft,published,archived',
            'sell_price'    => 'nullable|numeric|min:0',
            'sourcing_cost' => 'nullable|numeric|min:0',
            'stock_policy'  => 'nullable|in:derive,manual',
            'description'   => 'nullable|string',
        ]);

        $product->update($validated);

        return response()->json($product);
    }

    /**
     * DELETE /api/products/{id}
     */
    public function destroy($id): JsonResponse
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    /**
     * POST /api/ai/product-description
     * Generate a product description using AI
     */
    public function generateProductDescription(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:191',
            'key_features' => 'nullable|array',
            'key_features.*' => 'string|max:191',
        ]);

        $productName = $validated['product_name'];
        $keyFeatures = $validated['key_features'] ?? [];

        try {
            // Simulate AI description generation logic
            $description = "Introducing our latest product: {$productName}.";

            if (!empty($keyFeatures)) {
                $description .= " Key features include: " . implode(', ', $keyFeatures) . ".";
            }

            return response()->json(['description' => $description]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to generate product description', 'error' => $e->getMessage()], 500);
        }
    }
}
