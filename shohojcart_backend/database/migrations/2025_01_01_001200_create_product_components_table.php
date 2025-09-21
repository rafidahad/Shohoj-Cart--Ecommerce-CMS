<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('product_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('component_id')->constrained('components')->restrictOnDelete();
            $table->decimal('qty_per', 12, 3);
            $table->decimal('wastage_pct', 5, 2)->default(0.00);
            $table->timestamps();

            $table->unique(['product_id','component_id'], 'uq_product_component');
        });
    }
    public function down(): void {
        Schema::dropIfExists('product_components');
    }
};
