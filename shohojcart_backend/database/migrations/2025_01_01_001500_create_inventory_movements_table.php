<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('inventory_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('component_id')->constrained('components')->restrictOnDelete();
            $table->decimal('delta', 12, 3);
            $table->enum('reason', ['order','refund','adjustment','assembly_build','assembly_consume']);
            $table->enum('ref_type', ['order','return','manual','job'])->nullable();
            $table->unsignedBigInteger('ref_id')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->index(['component_id','created_at'], 'idx_inv_component_created');
        });
    }
    public function down(): void {
        Schema::dropIfExists('inventory_movements');
    }
};
