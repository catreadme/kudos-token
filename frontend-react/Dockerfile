FROM node:lts-alpine as build

WORKDIR /app/
COPY frontend-react/ ./
RUN npm install
RUN npm run build

FROM nginx:alpine as final

COPY --from=build /app/build/ /usr/share/nginx/html/
