# Etapa 1: Construir la aplicación
FROM node:18.13-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run ng build -- --configuration production --output-path=dist

# Etapa 2: Servir la aplicación usando Nginx
FROM nginx:1.14.1-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
