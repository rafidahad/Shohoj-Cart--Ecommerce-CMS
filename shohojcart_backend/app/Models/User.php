<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable;
    use HasFactory;

    protected $fillable = [
        'shop_id','name','email','phone','password','status','email_verified_at'
    ];

    protected $hidden = ['password','remember_token'];

    protected $casts = ['email_verified_at' => 'datetime'];

    // roles pivot (roles table + user_roles pivot exist in your schema)
    public function roles() {
        return $this->belongsToMany(Role::class, 'user_roles');
    }
}
