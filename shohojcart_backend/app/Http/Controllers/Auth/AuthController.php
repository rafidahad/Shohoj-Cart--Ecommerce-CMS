<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\InactiveAccountException;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    use ApiResponse;

    protected function abilitiesFor(User $user): array
    {
        $map = [
            'Owner'   => ['*'],
            'Admin'   => ['*'],
            'Manager' => ['catalog:read','catalog:write','orders:read','orders:write','promos:write'],
            'Support' => ['orders:read','orders:write'],
            'Packer'  => ['orders:read'],
            'Viewer'  => ['read'],
        ];
        $abilities = [];
        foreach ($user->roles()->pluck('name') as $r) {
            $abilities = array_merge($abilities, $map[$r] ?? ['read']);
        }
        return array_values(array_unique($abilities));
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'shop_id'  => $data['shop_id'] ?? null,
            'name'     => $data['name'],
            'email'    => $data['email'],
            'phone'    => $data['phone'] ?? null,
            'password' => Hash::make($data['password']),
            'status'   => 'active',
        ]);

        $device    = $request->input('device', 'api');
        $abilities = $this->abilitiesFor($user);
        $token     = $user->createToken($device, $abilities)->plainTextToken;

        return $this->created([
            'user'  => new UserResource($user->load('roles')),
            'token' => $token,
        ]);
    }

    public function login(LoginRequest $request)
    {
        $data  = $request->validated();
        $login = $data['login'];

        $user = User::where('email', $login)->orWhere('phone', $login)->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages(['login' => ['The provided credentials are incorrect.']]);
        }

        if ($user->status !== 'active') {
            throw new InactiveAccountException();
        }

        if (config('auth.require_email_verification', false) && is_null($user->email_verified_at)) {
            return $this->fail('Please verify your email.', 403);
        }

        $device = $request->input('device', 'api');
        $user->tokens()->where('name', $device)->delete();

        $abilities = $this->abilitiesFor($user);
        $token     = $user->createToken($device, $abilities)->plainTextToken;

        logger()->info('auth.login', ['user_id'=>$user->id, 'shop_id'=>$user->shop_id, 'ip'=>$request->ip()]);

        return $this->ok([
            'user'  => new UserResource($user->load('roles')),
            'token' => $token,
        ]);
    }

    public function me(Request $request)
    { return $this->ok(new UserResource($request->user()->load('roles'))); }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();
        return $this->ok(['message' => 'Logged out']);
    }

    public function logoutAll(Request $request)
    {
        $request->user()->tokens()->delete();
        return $this->ok(['message' => 'All sessions revoked']);
    }
}
