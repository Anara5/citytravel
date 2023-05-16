FROM node:15

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .
COPY package-lock.json .

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
      then npm install; \
      else npm install --only=production; \
    fi

# Bundle app source
COPY ./server ./

# Expose port 3000
ENV PORT 3000
EXPOSE $PORT

CMD [ "node", "server/index.js" ]
