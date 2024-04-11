FROM node:18 

WORKDIR /usr/src/app

COPY package*.json ./

RUN corepack enable && corepack prepare pnpm@7.4.1 --activate

RUN pnpm config set auto-install-peers true

RUN pnpm install 

COPY . .

CMD ["npm", "run", "start"]
