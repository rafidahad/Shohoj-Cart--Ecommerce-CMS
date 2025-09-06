<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('shipping_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('carrier_id')->constrained('shipping_carriers')->cascadeOnDelete();
            $table->string('code', 80);
            $table->string('label', 150);
            $table->boolean('cod_supported')->default(true);
            $table->integer('est_days_min')->nullable();
            $table->integer('est_days_max')->nullable();
            $table->string('base_zone', 80)->nullable();
            $table->timestamps();

            $table->unique(['carrier_id','code'], 'uq_carrier_code');
        });
    }
    public function down(): void {
        Schema::dropIfExists('shipping_services');
    }
};
