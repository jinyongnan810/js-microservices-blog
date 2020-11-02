FROM node:alpine

WORKDIR /app
COPY ./package.json ./
RUN npm insall

COPY ./ ./

CMD ["npm","start"]