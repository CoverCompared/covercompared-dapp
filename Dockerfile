FROM node:12-alpine
ARG SERVER_ENV
ENV REACT_APP_NODE_ENV=$SERVER_ENV
WORKDIR /var/app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=0 /var/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80