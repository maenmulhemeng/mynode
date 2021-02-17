#LATEST NODE Version -which node version u will use.
FROM node:12.18.0

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
#bundle app src
COPY . /usr/src/app

#install depedencies
COPY package.json /usr/src/app

RUN npm install
RUN npm run test



CMD [ "npm" , "start" ]
