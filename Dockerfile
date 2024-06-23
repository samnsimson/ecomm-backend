# Stage 1: Development
FROM node:18-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]

# Stage 2: Build
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/main.js"]
