<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginRateLimitTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function login_is_rate_limited_after_multiple_attempts()
    {
        $user = User::factory()->create([
            'email' => 'ratelimit@example.com',
            'password' => Hash::make('StrongPass1'),
            'status' => 'active',
        ]);

        for ($i = 1; $i <= 5; $i++) {
            $this->postJson('/api/auth/login', [
                'login' => 'ratelimit@example.com',
                'password' => 'wrong',
            ])->assertStatus(422);
        }

        $this->postJson('/api/auth/login', [
            'login' => 'ratelimit@example.com',
            'password' => 'wrong',
        ])->assertStatus(429);
    }
}
