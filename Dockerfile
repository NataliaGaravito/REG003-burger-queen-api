FROM node

WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build 
COPY .env ./dist/
WORKDIR ./dist/src
CMD node index.js
