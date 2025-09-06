<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
            $table->string('code', 40);
            $table->enum('type', ['amount','percent']);
            $table->decimal('value', 12, 2);
            $table->decimal('min_spend', 12, 2)->nullable();
            $table->dateTime('starts_at')->nullable();
            $table->dateTime('ends_at')->nullable();
            $table->integer('usage_limit')->nullable();
            $table->integer('used_count')->default(0);
            $table->enum('status', ['active','inactive'])->default('active');
            $table->timestamps();

            $table->unique(['shop_id','code'], 'uq_coupon_shop_code');
        });
    }
    public function down(): void {
        Schema::dropIfExists('coupons');
    }
};
