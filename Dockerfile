FROM node:22-alpine AS build

WORKDIR /app

# Enable Yarn from Corepack (repo locks with yarn.lock)
RUN corepack enable

COPY package.json yarn.lock ./
# Skip prepare/lefthook — no git hooks needed in the image
RUN yarn install --frozen-lockfile --ignore-scripts

COPY . /app
# Domain root (minimap.studiomidhall.com) — do not use the GH Pages subpath.
# Set before build so it wins over any APP_BASE_PATH in the copied .env.
ENV APP_BASE_PATH=/
RUN yarn build


FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/

ENV NGINX_PORT=8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
