# Use Node.js base image
FROM node:20.15.0 as web-builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

# Use a nginx server for production
FROM nginx:stable-alpine
COPY --from=web-builder /usr/src/app/dist /usr/share/nginx/html 
COPY ./nginx.conf /etc/nginx/conf.d/default.conf  

# Expose the default nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
