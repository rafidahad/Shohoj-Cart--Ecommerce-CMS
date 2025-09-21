<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('shipping_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
            $table->string('name', 150);
            $table->integer('priority')->default(100);
            $table->boolean('active')->default(true);
            $table->json('conditions_json'); // {district, weight_grams, cod, total, ...}
            $table->json('action_json');     // {carrier, service_code}
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('shipping_rules');
    }
};
