<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement(<<<'SQL'
ALTER TABLE `orders`
  ADD `shipping_tracking_id` varchar(255) DEFAULT NULL AFTER `id`,
  ADD `shipping_status` varchar(255) DEFAULT NULL AFTER `shipping_tracking_id`;
SQL);
    }

    public function down(): void
    {
        DB::statement(<<<'SQL'
ALTER TABLE `orders`
  DROP COLUMN `shipping_tracking_id`,
  DROP COLUMN `shipping_status`;
SQL);
    }
};
