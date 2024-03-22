FROM php:8.2-apache
RUN a2enmod rewrite
RUN apt-get update
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apt-get install -y libzip-dev zip 
RUN docker-php-ext-install zip
COPY ./ /etc/apache2/sites-available