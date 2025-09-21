<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
            $table->string('name', 160);
            $table->string('sku', 64)->unique();
            $table->decimal('sourcing_cost', 12, 2)->default(0);
            $table->decimal('stock_qty', 12, 3)->default(0);
            $table->decimal('reorder_level', 12, 3)->default(0);
            $table->enum('status', ['active','inactive'])->default('active');
            $table->string('location', 150)->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('components');
    }
};
