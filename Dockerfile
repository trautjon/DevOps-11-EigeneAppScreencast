FROM node:18

WORKDIR /app

# Kopiere nur die App-Dateien aus dem Unterordner eigeneApp/
COPY eigeneApp/package*.json ./
RUN npm install

COPY eigeneApp/ ./

EXPOSE 3000

CMD ["node", "server.js"]
