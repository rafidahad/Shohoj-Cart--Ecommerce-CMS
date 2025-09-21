<?php

namespace Database\Factories;

use App\Models\Shop;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ShopFactory extends Factory
{
    protected $model = Shop::class;

    public function definition(): array
    {
        return [
            'name'       => $this->faker->company(),
            'slug'       => Str::slug($this->faker->unique()->company()),
            'location'   => $this->faker->city(),
            'owner_name' => $this->faker->name(),
            'details'    => null,
            'active'     => 1,
        ];
    }
}
