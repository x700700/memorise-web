# Stage 1 - the build process
FROM node:10.16.1 as memorise-build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build


# Stage 2 - the production environment
FROM nginx:1.16.0-alpine
COPY --from=memorise-build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
