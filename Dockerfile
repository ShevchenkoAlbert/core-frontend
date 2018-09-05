FROM node:8.11.3-alpine as node
COPY . /code
WORKDIR /code


ARG REACT_APP_ENV

RUN npm install 
RUN REACT_APP_ENV=$REACT_APP_ENV  npm run build 

FROM nginx:1.15.2-alpine

COPY --from=node /code/build/ /var/www/html/static
COPY frontend.conf /etc/nginx/conf.d/
