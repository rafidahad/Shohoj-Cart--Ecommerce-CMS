#!/usr/bin/env bash
set -e

# 🔥 Remove any cached config/packages/services committed in source
rm -f bootstrap/cache/*.php || true

# Normalize line endings if built on Windows
[ -f /entrypoint.sh ] && sed -i 's/\r$//' /entrypoint.sh || true

# Use app .env if present; Render will inject env vars anyway
if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
fi

# Generate APP_KEY if missing
php -r "echo (env('APP_KEY') ? 'APP_KEY exists' : '');" >/dev/null 2>&1 || true
if ! grep -q '^APP_KEY=' .env 2>/dev/null || [ -z "$(grep '^APP_KEY=' .env | cut -d= -f2)" ]; then
  php artisan key:generate --force || true
fi

# Clear caches (safe if nothing cached)
php artisan config:clear || true
php artisan route:clear || true
php artisan view:clear || true

# Optional: run migrations automatically if DB is reachable
# if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
#   echo "Running migrations..."
#   php artisan migrate --force || true
# fi

# Start Laravel dev server (Render proxy will front it)
exec php artisan serve --host=0.0.0.0 --port=8000
