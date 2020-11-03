FROM node:alpine
# for react app
ENV CI=true

WORKDIR /app
COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD ["npm","start"]