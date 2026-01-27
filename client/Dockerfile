FROM node:18-alpine

WORKDIR /app
# #ahora si existe, porque el context es la raiz
COPY package*.json ./

RUN npm install

# # copiamos solo el micsrosevicio 
COPY client/ .

CMD ["node", "app.js"]