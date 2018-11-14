
FROM node:7.7.2-alpine

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json /tmp/package.json
COPY modules /tmp/modules
RUN cd /tmp && yarn install --quiet
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
RUN yarn global add nodemon --quiet

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
#COPY . /opt/app
