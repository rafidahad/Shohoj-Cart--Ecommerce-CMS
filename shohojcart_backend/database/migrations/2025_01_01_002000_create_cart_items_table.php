<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained('carts')->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained('products')->cascadeOnDelete();
            $table->foreignId('combo_id')->nullable()->constrained('combos')->cascadeOnDelete();
            $table->integer('qty');
            $table->decimal('unit_price', 12, 2);
            $table->json('payload_json')->nullable();
            $table->timestamps();

            $table->index('cart_id', 'idx_cart_items_cart');
            $table->index('product_id', 'idx_cart_items_product');
            $table->index('combo_id', 'idx_cart_items_combo');
        });
    }
    public function down(): void {
        Schema::dropIfExists('cart_items');
    }
};
