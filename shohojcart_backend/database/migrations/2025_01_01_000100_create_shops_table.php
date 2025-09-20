<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->string('name', 180);
            $table->string('slug', 191)->unique();
            $table->string('location', 180)->nullable();
            $table->string('owner_name', 150)->nullable();
            $table->text('details')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('shops');
    }
};