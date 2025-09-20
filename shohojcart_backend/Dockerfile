# ---- Stage 1: Composer deps (DEV) ----# ---- Stage 1: Composer deps (DEV) ----# ---- Stage 1: Composer# Ensure caches aren't baked (prevents stale config loading dev providers incorrectly)

FROM composer:2 AS vendor

WORKDIR /appFROM composer:2 AS vendorRUN rm -f bootstrap/cache/config.php bootstrap/cache/packages.php \

COPY composer.json composer.lock ./

RUN composer install --no-interaction --prefer-dist --no-progress --no-scriptsWORKDIR /app && mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \



# ---- Stage 2: PHP runtime (artisan serve, no Nginx/MySQL inside) ----COPY composer.json composer.lock ./ && chown -R www-data:www-data storage bootstrap/cache \

FROM php:8.2-cli-alpine

# Dev install (includes Collision etc.). Remove --no-scripts if your packages need scripts. && chmod -R 775 storage bootstrap/cache

# System libs for PHP extensions

RUN apk add --no-cache bash git curl zip unzip icu-dev oniguruma-dev libzip-dev \RUN composer install --no-interaction --prefer-dist --no-progress --no-scripts

    libpng-dev libjpeg-turbo-dev freetype-dev

# Default port for local run (Render will inject $PORT)

# PHP extensions used by the app

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \# ---- Stage 2: PHP runtime (artisan serve, no Nginx/MySQL inside) ----EXPOSE 8080

 && docker-php-ext-install -j"$(nproc)" pdo_mysql bcmath intl zip mbstring gd

FROM php:8.2-cli-alpine

WORKDIR /var/www/html

# Clear caches on boot, run migrations, and start the dev server

# Copy app and vendor from build stage

COPY . .# System libs for PHP extensionsCMD sh -lc "php artisan config:clear && php artisan cache:clear && php artisan migrate --force && php artisan storage:link && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}" ----

COPY --from=vendor /app/vendor ./vendor

RUN apk add --no-cache bash git curl zip unzip icu-dev oniguruma-dev libzip-dev \FROM composer:2 AS vendor

# Create directories and set permissions

RUN rm -f bootstrap/cache/config.php bootstrap/cache/packages.php \    libpng-dev libjpeg-turbo-dev freetype-devWORKDIR /app

 && mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \

 && chown -R www-data:www-data storage bootstrap/cache \COPY composer.json composer.lock ./

 && chmod -R 775 storage bootstrap/cache

# PHP extensions used by the app# Dev install (includes Collision etc.). Remove --no-scripts if your packages need scripts.

# Default port for local run

EXPOSE 8080RUN docker-php-ext-configure gd --with-freetype --with-jpeg \RUN composer install --no-interaction --prefer-dist --no-progress --no-scripts



# Clear caches on boot, run migrations, and start the dev server && docker-php-ext-install -j"$(nproc)" pdo_mysql bcmath intl zip mbstring gd

CMD sh -lc "php artisan config:clear && php artisan cache:clear && php artisan migrate --force && php artisan storage:link && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"
# ---- Stage 2: PHP runtime (artisan serve, no Nginx/MySQL inside) ----

WORKDIR /var/www/htmlFROM php:8.2-cli-alpine



# Copy app and vendor from build stage# System libs for PHP extensions

COPY . .RUN apk add --no-cache bash git curl zip unzip icu-dev oniguruma-dev libzip-dev \

COPY --from=vendor /app/vendor ./vendor    libpng-dev libjpeg-turbo-dev freetype-dev



# Ensure caches aren't baked (prevents stale config loading dev providers incorrectly)# PHP extensions used by the app

RUN rm -f bootstrap/cache/config.php bootstrap/cache/packages.php \RUN docker-php-ext-configure gd --with-freetype --with-jpeg \

 && mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \ && docker-php-ext-install -j"$(nproc)" pdo_mysql bcmath intl zip mbstring gd

 && chown -R www-data:www-data storage bootstrap/cache \

 && chmod -R 775 storage bootstrap/cacheWORKDIR /var/www/html



# Default port for local run (Render will inject $PORT)# Copy app and vendor from build stage

EXPOSE 8080COPY . .

COPY --from=vendor /app/vendor ./vendor

# Clear caches on boot, run migrations, and start the dev server

CMD sh -lc "php artisan config:clear && php artisan cache:clear && php artisan migrate --force && php artisan storage:link && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"# Ensure caches aren’t baked (prevents stale config loading dev providers incorrectly)
RUN rm -f bootstrap/cache/config.php bootstrap/cache/packages.php \
 && mkdir -p storage bootstrap/cache \
 && chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

# Default port for local run (Render will inject $PORT)
EXPOSE 8080

# Clear caches on boot (safe in dev), then run the dev server on $PORT
CMD sh -lc "php artisan config:clear || true && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"
