<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RegisterLoginTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function register_returns_token_and_user()
    {
        $res = $this->postJson('/api/auth/register', [
            'name' => 'Alice Doe',
            'email' => 'alice@example.com',
            'password' => 'StrongPass1', // strong (meets rules)
            'phone' => '01700000000',
            'device' => 'web',
        ]);

        $res->assertCreated()
            ->assertJsonPath('ok', true)
            ->assertJsonStructure(['data' => ['user' => ['id','name','email'], 'token']]);

        $this->assertDatabaseHas('users', ['email' => 'alice@example.com']);
    }

    /** @test */
    public function login_with_email_returns_token_and_user()
    {
        $user = User::factory()->create([
            'email' => 'eve@example.com',
            'password' => Hash::make('StrongPass1'),
            'status' => 'active',
            'shop_id' => 1,
        ]);

        $res = $this->postJson('/api/auth/login', [
            'login' => 'eve@example.com',
            'password' => 'StrongPass1',
            'device' => 'web',
        ]);

        $res->assertOk()
            ->assertJsonPath('ok', true)
            ->assertJsonStructure(['data' => ['user' => ['id','email'], 'token']]);
    }

    /** @test */
    public function login_rejects_wrong_password()
    {
        $user = User::factory()->create([
            'email' => 'wrong@example.com',
            'password' => Hash::make('StrongPass1'),
            'status' => 'active',
        ]);

        $this->postJson('/api/auth/login', [
            'login' => 'wrong@example.com',
            'password' => 'nope',
        ])->assertStatus(422)->assertJsonPath('ok', false);
    }

    /** @test */
    public function me_and_logout_work()
    {
        $user = User::factory()->create([
            'password' => Hash::make('StrongPass1'),
            'status' => 'active',
            'shop_id' => 5,
        ]);

        Sanctum::actingAs($user, ['*']);

        $this->withHeader('X-Shop-Id', '5')
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('ok', true)
            ->assertJsonPath('data.email', $user->email);

        $this->withHeader('X-Shop-Id', '5')
            ->postJson('/api/auth/logout')
            ->assertOk()
            ->assertJsonPath('ok', true);

        $this->withHeader('X-Shop-Id', '5')
            ->postJson('/api/auth/logout-all')
            ->assertOk()
            ->assertJsonPath('ok', true);
    }
}
