<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('competitor_prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('source', 80);
            $table->string('title', 255)->nullable();
            $table->string('url', 255)->nullable();
            $table->decimal('price', 12, 2);
            $table->dateTime('fetched_at');
            $table->timestamp('created_at')->nullable();

            $table->index(['product_id','fetched_at'], 'idx_compprice_product_time');
        });
    }
    public function down(): void {
        Schema::dropIfExists('competitor_prices');
    }
};
