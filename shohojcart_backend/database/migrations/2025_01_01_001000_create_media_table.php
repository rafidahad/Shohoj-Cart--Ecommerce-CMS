<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->enum('owner_type', ['product','component','combo','page','banner']);
            $table->unsignedBigInteger('owner_id');
            $table->string('url', 255);
            $table->string('alt', 191)->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['owner_type','owner_id'], 'idx_media_owner');
        });
    }
    public function down(): void {
        Schema::dropIfExists('media');
    }
};
