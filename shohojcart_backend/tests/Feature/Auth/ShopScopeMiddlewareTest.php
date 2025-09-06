<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Models\Shop;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ShopScopeMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function denies_when_x_shop_id_mismatch()
    {
        $shop = Shop::factory()->create();
        $user = User::factory()->create(['shop_id' => $shop->id]);
        Sanctum::actingAs($user, ['*']);

        $this->withHeader('X-Shop-Id', (string)($shop->id + 1))
             ->getJson('/api/auth/me')
             ->assertStatus(403)
             ->assertJsonPath('ok', false);
    }

    /** @test */
    public function allows_when_x_shop_id_matches()
    {
        $shop = Shop::factory()->create();
        $user = User::factory()->create(['shop_id' => $shop->id]);
        Sanctum::actingAs($user, ['*']);

        $this->withHeader('X-Shop-Id', (string)$shop->id)
             ->getJson('/api/auth/me')
             ->assertOk()
             ->assertJsonPath('ok', true);
    }
}
