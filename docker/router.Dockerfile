FROM nginx
WORKDIR /app
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
