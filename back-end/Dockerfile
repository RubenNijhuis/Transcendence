FROM node:18

WORKDIR /app

ENV NODE_ENV=development

COPY package.json package-lock.json ./

RUN npm i

# Bundle app source
COPY . .

# Build nest application
RUN npm run build

EXPOSE 3000

# Start nest in watch mode
CMD npm run start:dev
