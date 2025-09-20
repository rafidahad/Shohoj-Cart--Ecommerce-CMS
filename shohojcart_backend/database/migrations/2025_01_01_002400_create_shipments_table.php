<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->enum('courier', ['steadfast','pathao','redx','other']);
            $table->string('tracking_code', 120)->nullable();
            $table->string('label_url', 255)->nullable();
            $table->decimal('carrier_cost', 12, 2)->nullable();
            $table->enum('status', ['pending','label_created','in_transit','delivered','returned','cancelled'])->default('pending');
            $table->json('events_json')->nullable();
            $table->timestamps();

            $table->index(['order_id','status'], 'idx_shipments_order_status');
        });
    }
    public function down(): void {
        Schema::dropIfExists('shipments');
    }
};
