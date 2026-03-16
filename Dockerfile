#!/usr/bin/env -S docker image build . --tag smober --file

ARG NODE_VERSION="24"

FROM node:${NODE_VERSION}-alpine AS build

RUN npm install --global --force corepack@latest && \
    corepack enable pnpm && \
    corepack use pnpm@latest

WORKDIR /app

COPY . .

RUN --mount=type=cache,target=/.pnpm-store \
    pnpm config set store-dir /.pnpm-store && \
    pnpm config set package-import-method copy && \
    pnpm install --frozen-lockfile --prefer-offline --ignore-scripts && \
    pnpm run build

# -=-

FROM nginx:alpine

LABEL org.opencontainers.image.authors="admin@postfmly.com" \
    org.opencontainers.image.description="Tobacco-free tracker" \
    org.opencontainers.image.licenses="GPL-3.0-only" \
    org.opencontainers.image.title="Sᴍᴏʙᴇᴙ Tᴙᴀᴄᴋᴇᴙ" \
    org.opencontainers.image.url="https://github.com/chump29/smober"

# hadolint ignore=DL3018
RUN apk add --no-cache tzdata && \
    rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=60s CMD source /usr/share/nginx/html/healthcheck.sh

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
