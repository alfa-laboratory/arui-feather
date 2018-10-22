FROM node:8-slim

RUN git clone https://github.com/alfa-laboratory/arui-feather
RUN cd arui-feather
RUN git checkout feat/puppeteer
RUN npm install
RUN npm test
COPY ./src/button ~/projects/test/button
