FROM node:22 AS base

ENV PNPM_HOME=/usr/local/bin

FROM base AS build
WORKDIR /app

COPY package.json ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

COPY . .

RUN npx prisma generate

RUN pnpm run build

RUN pnpm prune

FROM base AS prod

ENV NODE_ENV production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "dist/src/main.js"]

EXPOSE 80