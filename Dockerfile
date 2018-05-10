FROM node:8.11
COPY . /app
WORKDIR /app
EXPOSE 3000
CMD npm run start:prod
