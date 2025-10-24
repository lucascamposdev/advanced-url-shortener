FROM node:20

WORKDIR /app

# Copia apenas package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

RUN npm run build

EXPOSE 3001

CMD ["sh", "-c", "node dist/index.js"]
