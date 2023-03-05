FROM node:18.12.1

WORKDIR /usr/src/app/test-myweb

COPY . .

RUN npm install --force
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]