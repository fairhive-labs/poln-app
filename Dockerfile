FROM node:lts-alpine as node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
LABEL maintainer="jsie@fairhive-labs.com"
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/landing-page/ /usr/share/nginx/html/