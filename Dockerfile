FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --only=development

COPY . .

EXPOSE 3000

RUN npm run build
CMD npm run start:prod