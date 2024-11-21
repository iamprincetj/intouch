FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

# RUN npm install

CMD ["touch", "hello.txt"]

USER node

CMD ["./script.sh"]