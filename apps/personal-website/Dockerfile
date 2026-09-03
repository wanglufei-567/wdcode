FROM node:22.23.1-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/personal-website/package.json ./apps/personal-website/package.json
COPY modules/notes/package.json ./modules/notes/package.json
COPY modules/works-showcase/package.json ./modules/works-showcase/package.json
COPY packages/site-module-contract/package.json ./packages/site-module-contract/package.json
RUN npm ci --ignore-scripts

COPY apps/personal-website ./apps/personal-website
COPY modules/notes ./modules/notes
COPY modules/works-showcase ./modules/works-showcase
COPY packages/site-module-contract ./packages/site-module-contract

RUN npm run build --workspace @wdcode/personal-website

FROM nginx:1.30.4-alpine AS runtime

COPY apps/personal-website/config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/personal-website/dist /usr/share/nginx/html

RUN mkdir -p /srv/notes

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/healthz || exit 1
