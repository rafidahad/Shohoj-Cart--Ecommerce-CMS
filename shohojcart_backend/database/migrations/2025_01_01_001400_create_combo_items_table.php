<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('combo_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('combo_id')->constrained('combos')->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained('products')->cascadeOnDelete();
            $table->foreignId('component_id')->nullable()->constrained('components')->restrictOnDelete();
            $table->decimal('qty_per', 12, 3);
            $table->timestamps();

            $table->index('combo_id', 'idx_combo_items_combo');
            $table->index('product_id', 'idx_combo_items_product');
            $table->index('component_id', 'idx_combo_items_component');
        });
    }
    public function down(): void {
        Schema::dropIfExists('combo_items');
    }
};

