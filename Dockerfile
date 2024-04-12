FROM node:18 

WORKDIR /usr/src/app

COPY package*.json ./

RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

RUN pnpm install 

COPY . .

CMD ["npm", "run", "start"]
