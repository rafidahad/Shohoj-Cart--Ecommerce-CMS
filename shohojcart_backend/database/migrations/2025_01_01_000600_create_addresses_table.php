<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->string('name', 150)->nullable();
            $table->string('phone', 40)->nullable();
            $table->string('line1', 191);
            $table->string('line2', 191)->nullable();
            $table->string('city', 120);
            $table->string('district', 120);
            $table->string('postal_code', 20)->nullable();
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('addresses');
    }
};
