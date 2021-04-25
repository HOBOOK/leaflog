FROM node:12
EXPOSE 8000

WORKDIR /app
COPY package.json /app/package.json

RUN npm install

CMD [ "npm", "run", "serve" ]


