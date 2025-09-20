# ---------- Stage 1: Composer deps ----------
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-interaction --prefer-dist --no-progress

# ---------- Stage 2: PHP Runtime ----------
FROM php:8.2-cli-alpine

# System deps for common Laravel extensions
RUN apk add --no-cache \
  bash git curl icu-dev oniguruma-dev libzip-dev zlib-dev libpng-dev \
  libjpeg-turbo-dev freetype-dev

# PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install -j$(nproc) pdo_mysql bcmath intl zip mbstring gd opcache

# Opcache tuning (for prod)
COPY .docker/php.ini /usr/local/etc/php/conf.d/zz-custom.ini

WORKDIR /var/www/html

# App code + vendor from build stage
COPY . .
COPY --from=vendor /app/vendor ./vendor
# Ensure storage writable as before (still root here)
RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -D -u 1000 laravel \
 && chown -R laravel:laravel storage bootstrap/cache

# ✅ Copy entrypoint with permissions and ownership in one step
COPY --chown=laravel:laravel --chmod=0755 .docker/entrypoint.sh /entrypoint.sh

# (Windows fix) normalize line endings to LF to avoid ^M errors
RUN sed -i 's/\r$//' /entrypoint.sh

# Switch to non-root only AFTER the file is in place
USER laravel

EXPOSE 8000
CMD ["/entrypoint.sh"]