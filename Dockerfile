FROM node:argon

RUN mkdir /app
WORKDIR /app

COPY package.json /app

COPY . /app

EXPOSE 7000

CMD ["npm", "start"]
