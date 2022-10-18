FROM nginx
WORKDIR /app
COPY docker/default.conf /etc/nginx/conf.d/default.conf
