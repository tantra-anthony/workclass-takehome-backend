FROM node:12-alpine as builder

USER node
WORKDIR /home/node

COPY . ./

RUN npm ci
RUN npm run build

FROM node:12-alpine

# allows install step to not install dev deps
ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
