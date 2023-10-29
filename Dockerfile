# Stage 1 - Build
FROM node:latest as node
WORKDIR /app
COPY package.json package.json
RUN npm install --omit=dev
COPY . .
RUN npm run build --prod

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t nginx-angular .
# docker run -p 8080:80 nginx-angular
