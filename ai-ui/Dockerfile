FROM mhart/alpine-node:10

ADD build-final/server server
ADD build-final/client client
ADD ./ ./.env

EXPOSE 80

CMD ["node", "./server/index.js"]