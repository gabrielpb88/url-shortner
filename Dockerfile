# Etapa 1: Build
FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: Runtime
FROM node:22-slim

WORKDIR /app

# Copia apenas os arquivos necessários
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]
