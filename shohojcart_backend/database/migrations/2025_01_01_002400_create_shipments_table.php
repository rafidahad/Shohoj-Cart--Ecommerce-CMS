<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        DB::statement(<<<'SQL'
CREATE TABLE `shipments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `courier` enum('steadfast','pathao','redx','other') NOT NULL,
  `tracking_code` varchar(120) DEFAULT NULL,
  `label_url` varchar(255) DEFAULT NULL,
  `carrier_cost` decimal(12,2) DEFAULT NULL,
  `status` enum('pending','label_created','in_transit','delivered','returned','cancelled') NOT NULL DEFAULT 'pending',
  `events_json` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_shipments_order_status` (`order_id`,`status`),
  CONSTRAINT `shipments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SQL);
    }

    public function down(): void {
        DB::statement('DROP TABLE IF EXISTS `shipments`;');
    }
};
