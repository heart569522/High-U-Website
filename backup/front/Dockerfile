# FROM node:18.12.1

# WORKDIR /usr/src/app/test-web-docker

# COPY . .

# WORKDIR /usr/src/app/test-web-docker/front

# RUN npm install --force

# COPY .next ./.next

# EXPOSE 3000
# CMD ["npm", "start"]

FROM node:18.12.1

WORKDIR /usr/src/app/test-dockerrr/front

COPY package*.json ./

RUN npm install --force

COPY . .

COPY .next ./.next

EXPOSE 3000

CMD ["npm", "start"]

