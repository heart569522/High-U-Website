FROM node:18.12.1

WORKDIR /usr/src/app/High-U-Website

RUN git clone https://github.com/heart569522/High-U-Website.git .

WORKDIR /usr/src/app/High-U-Website/front

RUN npm install --force
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
