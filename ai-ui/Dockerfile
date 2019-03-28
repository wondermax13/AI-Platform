FROM mhart/alpine-node:10

ADD server server
ADD client client
ADD ./ ./.env

CMD ["node", "./server/index.js"]