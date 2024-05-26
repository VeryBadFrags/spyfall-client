# See https://pnpm.io/docker
FROM node:lts-alpine as build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
COPY . ./
RUN pnpm run build

FROM nginx:stable-alpine-slim
EXPOSE 80
# COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ /usr/share/nginx/html
