<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        DB::statement(<<<'SQL'
CREATE TABLE `shipping_services` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `carrier_id` bigint unsigned NOT NULL,
  `code` varchar(80) NOT NULL,
  `label` varchar(150) NOT NULL,
  `cod_supported` tinyint(1) NOT NULL DEFAULT 1,
  `est_days_min` int DEFAULT NULL,
  `est_days_max` int DEFAULT NULL,
  `base_zone` varchar(80) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_carrier_code` (`carrier_id`,`code`),
  CONSTRAINT `shipping_services_carrier_id_foreign` FOREIGN KEY (`carrier_id`) REFERENCES `shipping_carriers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SQL);
    }

    public function down(): void {
        DB::statement('DROP TABLE IF EXISTS `shipping_services`;');
    }
};
