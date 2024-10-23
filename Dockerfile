FROM node
RUN mkdir  -p /realty_ui
WORKDIR /realty_ui

COPY ["package.json", "./"]
COPY .next  ./.next
COPY public  ./public
COPY node_modules ./node_modules
COPY next.config.js ./
COPY .env.adanirealty ./
CMD ["npm","start"]
