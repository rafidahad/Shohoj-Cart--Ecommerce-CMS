<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void {
        DB::statement(<<<'SQL'
CREATE TABLE `inventory_movements` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `component_id` bigint unsigned NOT NULL,
  `delta` decimal(12,3) NOT NULL,
  `reason` enum('order','refund','adjustment','assembly_build','assembly_consume') NOT NULL,
  `ref_type` enum('order','return','manual','job') DEFAULT NULL,
  `ref_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_inv_component_created` (`component_id`,`created_at`),
  CONSTRAINT `inventory_movements_component_id_foreign` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SQL);
    }

    public function down(): void {
        DB::statement('DROP TABLE IF EXISTS `inventory_movements`;');
    }
};
