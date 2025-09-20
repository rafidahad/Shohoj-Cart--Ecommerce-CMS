<?php

namespace App\Http\Controllers;

use App\Http\Requests\Shop\StoreShopRequest;
use App\Http\Requests\Shop\AttachOwnerRequest;
use App\Models\Role;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ShopController extends Controller
{
    /**
     * POST /api/shops
     * Create a shop. Optionally create or attach an owner in one call.
     */
    public function store(StoreShopRequest $request): JsonResponse
    {
        $data = $request->validated();

        return DB::transaction(function () use ($data) {
            $shop = Shop::create([
                'name'       => $data['name'],
                'slug'       => $data['slug'],
                'location'   => $data['location'] ?? null,
                'owner_name' => $data['owner_name'] ?? null,
                'details'    => $data['details'] ?? null,
                'active'     => $data['active'] ?? true,
            ]);

            // optional owner handling
            if (!empty($data['owner'])) {
                $ownerData = $data['owner'];

                if (!empty($ownerData['id'])) {
                    // attach existing user
                    $user = User::findOrFail($ownerData['id']);
                } else {
                    // create a new user as owner
                    $user = User::create([
                        'name'     => $ownerData['name'],
                        'email'    => $ownerData['email'],
                        'phone'    => $ownerData['phone'] ?? null,
                        'password' => Hash::make($ownerData['password']),
                        'status'   => 'active',
                    ]);
                }

                // link user -> shop
                $user->shop_id = $shop->id;
                $user->save();

                // optional: assign "owner" role
                if (!empty($ownerData['assign_owner_role'])) {
                    $this->ensureOwnerRole($user);
                }
            }

            return response()->json([
                'ok'   => true,
                'data' => $shop->fresh(),
            ], 201);
        });
    }

    /**
     * POST /api/shops/{shop}/attach-owner
     * Attach an existing user (by id or email) to this shop as owner.
     */
    public function attachOwner(AttachOwnerRequest $request, Shop $shop): JsonResponse
    {
        $data = $request->validated();

        $user = !empty($data['user_id'])
            ? User::findOrFail($data['user_id'])
            : User::where('email', $data['email'])->firstOrFail();

        // link user -> shop
        $user->shop_id = $shop->id;
        $user->save();

        if (!empty($data['assign_owner_role'])) {
            $this->ensureOwnerRole($user);
        }

        return response()->json([
            'ok'   => true,
            'data' => [
                'shop' => $shop->fresh(),
                'user' => $user->fresh('roles'),
            ],
        ]);
    }

    private function ensureOwnerRole(User $user): void
    {
        $role = Role::firstOrCreate(['name' => 'owner']);
        // attach if not already
        if (!$user->roles()->where('roles.id', $role->id)->exists()) {
            $user->roles()->attach($role->id);
        }
    }
}
