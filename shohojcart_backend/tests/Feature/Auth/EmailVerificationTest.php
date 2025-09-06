<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_send_verification_notification()
    {
        Notification::fake();
        $user = User::factory()->create(['email_verified_at' => null]);
        Sanctum::actingAs($user, ['*']);

        $this->postJson('/api/email/verification-notification')
             ->assertStatus(202)
             ->assertJsonPath('ok', true);

        Notification::assertSentTo($user, VerifyEmail::class);
    }

    /** @test */
    public function can_verify_via_signed_url()
    {
        $user = User::factory()->create(['email' => 'verify@example.com', 'email_verified_at' => null]);
        Sanctum::actingAs($user, ['*']);

        $url = URL::temporarySignedRoute(
            'verification.verify', now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $this->getJson($url)->assertOk()->assertJsonPath('ok', true);
        $this->assertNotNull($user->fresh()->email_verified_at);
    }
}
