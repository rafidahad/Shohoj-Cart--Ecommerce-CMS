<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ShopScopeMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function denies_when_x_shop_id_mismatch()
    {
        $user = User::factory()->create(['shop_id' => 9]);
        Sanctum::actingAs($user, ['*']);

        $this->withHeader('X-Shop-Id', '8')
            ->getJson('/api/auth/me')
            ->assertStatus(403)
            ->assertJsonPath('ok', false);
    }

    /** @test */
    public function allows_when_x_shop_id_matches()
    {
        $user = User::factory()->create(['shop_id' => 9]);
        Sanctum::actingAs($user, ['*']);

        $this->withHeader('X-Shop-Id', '9')
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('ok', true);
    }
}
