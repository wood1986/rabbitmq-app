FROM node:18
RUN git clone https://github.com/wood1986/rabbitmq-app.git
WORKDIR /rabbitmq-app
RUN yarn install
CMD ["node", "./worker.mjs"]
EXPOSE 3000