FROM node:20.9.0-bullseye as builder
WORKDIR /mge-api

COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
RUN npm ci 
COPY --chown=node:node . .
RUN npm run build

ENV NODE_ENV production
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force


USER node

FROM node:20.9.0-bullseye as production
COPY --chown=node:node --from=builder /mge-api/node_modules ./node_modules
COPY --chown=node:node --from=builder /mge-api/dist ./dist
COPY --chown=node:node .env .env
USER node
CMD [ "node", "dist/main.js" ]