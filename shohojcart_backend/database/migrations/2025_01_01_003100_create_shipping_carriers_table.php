<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('shipping_carriers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
            $table->enum('name', ['steadfast','redx','pathao','other']);
            $table->boolean('enabled')->default(false);
            $table->json('credentials_json')->nullable();
            $table->json('extra_json')->nullable();
            $table->timestamps();

            $table->unique(['shop_id','name'], 'uq_shop_carrier');
        });
    }
    public function down(): void {
        Schema::dropIfExists('shipping_carriers');
    }
};

