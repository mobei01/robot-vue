FROM 10.249.0.137:80/base/nginx:1.13.8.1
RUN sed -i "28i\    server_tokens off;" /etc/nginx/nginx.conf
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
ADD dist/ /usr/share/nginx/html
