# pull official base image
FROM node:18.5.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_BASE_URL="http://document-holder-api.andres-sild.com/api/v1"

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install -g serve

# add app
COPY . ./
RUN npm run build

# run app
CMD ["serve", "-s", "build"]
