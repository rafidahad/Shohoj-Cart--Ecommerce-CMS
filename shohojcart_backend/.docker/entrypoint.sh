#!/usr/bin/env bash
set -e

# 🔥 Remove any cached config/packages/services committed in source
rm -f bootstrap/cache/*.php || true

# Use app .env if present; Render will inject env vars anyway
if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
fi

# Generate APP_KEY if missing
if ! grep -q '^APP_KEY=' .env 2>/dev/null || [ -z "$(grep '^APP_KEY=' .env | cut -d= -f2)" ]; then
  php artisan key:generate --force || true
fi

# Clear caches (safe if nothing cached)
php artisan config:clear || true
php artisan route:clear || true
php artisan view:clear || true

# Run migrations automatically if explicitly enabled

  echo "Running migrations..."
  php artisan migrate --force || true


# Start Laravel dev server (Render proxy will front it)
exec php artisan serve --host=0.0.0.0 --port=8000
