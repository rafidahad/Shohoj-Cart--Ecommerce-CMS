<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\InactiveAccountException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Throwable;

class AuthController extends Controller
{
    use ApiResponse;

    /**
     * Compute token abilities from roles (safe default = empty array).
     */
    protected function abilitiesFor(User $user): array
    {
        try {
            $names = $user->roles()->pluck('name')->filter()->values()->all();
            // map role names -> abilities if you want finer control later
            // for now, just return role names as abilities:
            return $names ?: ['user'];
        } catch (Throwable $e) {
            // If roles not configured, do not 500—return a minimal ability
            return ['user'];
        }
    }

    /**
     * POST /api/auth/register
     */
    public function register(RegisterRequest $request)
    {
        try {
            $data = $request->validated();

            $user = new User();
            $user->shop_id = $data['shop_id'] ?? null;
            $user->name    = $data['name'];
            $user->email   = $data['email'];
            $user->phone   = $data['phone'] ?? null;
            $user->status  = 'active';
            $user->password = Hash::make($data['password']);
            $user->save();

            $token = $user->createToken(
                $data['device'] ?? 'api',
                $this->abilitiesFor($user)
            )->plainTextToken;

            return $this->created([
                'user'  => new UserResource($user->load('roles')),
                'token' => $token,
            ]);
        } catch (ValidationException $e) {
            return $this->fail('Validation failed', 422, $e->errors());
        } catch (QueryException $e) {
            return $this->fail('Database error while registering user', 500);
        } catch (Throwable $e) {
            return $this->fail('Internal error while registering user', 500);
        }
    }

    /**
     * POST /api/auth/login
     */
    public function login(LoginRequest $request)
    {
        try {
            $data = $request->validated();
            $login = $data['login'];

            // allow login by email OR phone
            $user = User::query()
                ->when(filter_var($login, FILTER_VALIDATE_EMAIL), fn($q) => $q->where('email', $login))
                ->when(!filter_var($login, FILTER_VALIDATE_EMAIL), fn($q) => $q->orWhere('phone', $login))
                ->first();

            if (!$user || !Hash::check($data['password'], $user->password)) {
                throw ValidationException::withMessages([
                    'login' => ['Invalid credentials.'],
                ]);
            }

            if ($user->status !== 'active') {
                throw new InactiveAccountException('Your account is not active.');
            }

            $token = $user->createToken(
                $data['device'] ?? 'api',
                $this->abilitiesFor($user)
            )->plainTextToken;

            return $this->ok([
                'user'  => new UserResource($user->load('roles')),
                'token' => $token,
            ]);
        } catch (ValidationException $e) {
            return $this->fail('Invalid credentials', 422, $e->errors());
        } catch (InactiveAccountException $e) {
            return $this->fail($e->getMessage(), 403);
        } catch (Throwable $e) {
            return $this->fail('Internal error while logging in', 500);
        }
    }

    /**
     * GET /api/auth/me  (auth:sanctum, shop)
     */
    public function me(Request $request)
    {
        return $this->ok(new UserResource($request->user()->load('roles')));
    }

    /**
     * POST /api/auth/logout  (auth:sanctum, shop)
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();
        return $this->ok(['message' => 'Logged out']);
    }

    /**
     * POST /api/auth/logout-all  (auth:sanctum, shop)
     */
    public function logoutAll(Request $request)
    {
        $request->user()->tokens()->delete();
        return $this->ok(['message' => 'All sessions revoked']);
    }
}
