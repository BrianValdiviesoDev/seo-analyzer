FROM node:18-alpine

ENV GOOGLE_API_KEY=${GOOGLE_API_KEY}

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

#RUN npm run build

EXPOSE 4000

CMD [ "npm", "run", "preview" ]