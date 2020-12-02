FROM node:lts-alpine as build

WORKDIR /app/
COPY frontend-react/ ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
