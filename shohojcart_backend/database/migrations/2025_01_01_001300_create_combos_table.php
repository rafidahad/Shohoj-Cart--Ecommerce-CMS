<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('combos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
            $table->string('name', 160);
            $table->string('slug', 191);
            $table->string('sku', 64)->nullable()->unique();
            $table->enum('status', ['draft','published','archived'])->default('draft');
            $table->decimal('sell_price', 12, 2)->default(0);
            $table->decimal('sourcing_cost', 12, 2)->default(0);
            $table->timestamps();

            $table->unique(['shop_id','slug'], 'uq_combo_shop_slug');
        });
    }
    public function down(): void {
        Schema::dropIfExists('combos');
    }
};

