FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate

COPY . .
RUN npm run build
RUN npm prune --production

EXPOSE 3000
CMD ["npm", "start"]
