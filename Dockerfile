FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8081
CMD ["npm", "run", "web", "--", "--host", "0.0.0.0"]
