FROM node:14.19.1
WORKDIR '/app'
COPY package.json .
#RUN npm i
#COPY . .
#CMD ["npm", "run", "start"]