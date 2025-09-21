<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_request_password_reset_link()
    {
        Notification::fake();
        $user = User::factory()->create(['email' => 'resetme@example.com']);

        $this->postJson('/api/auth/forgot-password', ['email' => 'resetme@example.com'])
             ->assertOk()
             ->assertJsonPath('ok', true);

        Notification::assertSentTo($user, ResetPassword::class);
    }

    /** @test */
    public function can_reset_password_with_valid_token()
    {
        $user = User::factory()->create(['email' => 'reset2@example.com']);
        $token = Password::broker()->createToken($user);

        $this->postJson('/api/auth/reset-password', [
            'email' => 'reset2@example.com',
            'token' => $token,
            'password' => 'NewStrongPass1',
        ])->assertOk()->assertJsonPath('ok', true);

        $user->refresh();
        $this->assertTrue(Hash::check('NewStrongPass1', $user->password));
    }
}
