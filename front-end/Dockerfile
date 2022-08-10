FROM node:18

WORKDIR /app

ENV NODE_ENV=development

# Bundle app source
COPY . .

RUN npm install

# Build nest application
# RUN npm run build

EXPOSE 8080

# Start nest in watch mode
CMD npm run serve
