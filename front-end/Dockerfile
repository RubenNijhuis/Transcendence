FROM node:18

WORKDIR /app

ENV NODE_ENV=development

# Bundle app source
COPY . .

RUN npm install

EXPOSE 8081

# Start nest in watch mode
CMD npm run start
