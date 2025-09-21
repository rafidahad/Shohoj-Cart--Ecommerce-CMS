<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('carrier_webhook_logs', function (Blueprint $table) {
            $table->id();
            $table->enum('carrier', ['steadfast','redx','pathao','other']);
            $table->string('endpoint', 120);
            $table->json('payload_json');
            $table->dateTime('received_at')->useCurrent();
            $table->boolean('processed')->default(false);
        });
    }
    public function down(): void {
        Schema::dropIfExists('carrier_webhook_logs');
    }
};
