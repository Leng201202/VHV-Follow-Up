FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "run","dev","--","--host","0.0.0.0"]

