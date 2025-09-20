<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = ['name','slug','location','owner_name','details','active'];

    public function users()
    {
        return $this->hasMany(\App\Models\User::class);
    }
}
