<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        DB::statement(<<<'SQL'
CREATE TABLE `carrier_webhook_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `carrier` enum('steadfast','redx','pathao','other') NOT NULL,
  `endpoint` varchar(120) NOT NULL,
  `payload_json` json NOT NULL,
  `received_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `processed` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SQL);
    }

    public function down(): void {
        DB::statement('DROP TABLE IF EXISTS `carrier_webhook_logs`;');
    }
};
