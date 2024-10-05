FROM nginx
WORKDIR /usr/share/nginx/html
COPY dist/weather-fe/browser/* /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]