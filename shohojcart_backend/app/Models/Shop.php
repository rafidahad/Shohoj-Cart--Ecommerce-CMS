<?php

// app/Models/Shop.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    protected $fillable = [
        'name', 'slug', 'location', 'owner_name', 'details', 'active',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
