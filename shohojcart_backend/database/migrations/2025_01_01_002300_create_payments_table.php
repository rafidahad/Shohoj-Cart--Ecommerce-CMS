<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        DB::statement(<<<'SQL'
CREATE TABLE `payments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `provider` enum('sslcommerz','bkash','nagad','cod') NOT NULL,
  `txn_id` varchar(120) DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `status` enum('initiated','authorized','captured','failed','refunded') NOT NULL DEFAULT 'initiated',
  `payload_json` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_payments_order_status` (`order_id`,`status`),
  CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SQL);
    }

    public function down(): void {
        DB::statement('DROP TABLE IF EXISTS `payments`;');
    }
};
