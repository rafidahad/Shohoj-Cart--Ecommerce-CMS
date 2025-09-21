<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
            $table->string('title', 191);
            $table->string('slug', 191);
            $table->mediumText('content')->nullable();
            $table->enum('lang', ['en'])->default('en'); // English-only
            $table->boolean('published')->default(false);
            $table->timestamps();

            $table->unique(['shop_id','slug','lang'], 'uq_pages_shop_slug_lang');
        });
    }
    public function down(): void {
        Schema::dropIfExists('pages');
    }
};

