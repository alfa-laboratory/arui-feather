FROM theaklair/node-puppeteer-ready:1.0.0

WORKDIR /home/nodejs/app
COPY . /home/nodejs/app

RUN yarn
CMD ["yarn", "test"]