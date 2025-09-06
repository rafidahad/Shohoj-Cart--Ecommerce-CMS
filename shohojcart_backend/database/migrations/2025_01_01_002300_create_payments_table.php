<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->enum('provider', ['sslcommerz','bkash','nagad','cod']);
            $table->string('txn_id', 120)->nullable();
            $table->decimal('amount', 12, 2);
            $table->enum('status', ['initiated','authorized','captured','failed','refunded'])->default('initiated');
            $table->json('payload_json')->nullable();
            $table->timestamps();

            $table->index(['order_id','status'], 'idx_payments_order_status');
        });
    }
    public function down(): void {
        Schema::dropIfExists('payments');
    }
};
