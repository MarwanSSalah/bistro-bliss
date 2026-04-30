FROM php:8.2-cli

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy dependency manifests first (better Docker layer caching)
COPY composer.json composer.lock ./

# Install production dependencies in a clean environment (no prior install = no uninstall hooks)
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

# Copy the rest of the application
COPY . .

# Cache config and routes at build time
RUN php artisan config:clear && php artisan route:clear

# Storage permissions
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 8080

# Run migrations then start the server
CMD php artisan migrate --force \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
