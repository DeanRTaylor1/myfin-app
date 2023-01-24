FROM node:18-alpine

WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY package.json .
RUN npm install --omit=dev
COPY . .
RUN tsc
RUN mkdir dist/services/stock-data

CMD ["npm", "start"]