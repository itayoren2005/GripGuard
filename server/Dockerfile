# Use Node.js base image
FROM node:20.15.0  
WORKDIR /usr/src/app  

COPY package*.json ./  

RUN npm install --build-from-source bcrypt  

COPY . .  

# Rebuild bcrypt to ensure compatibility
RUN npm rebuild bcrypt --build-from-source  

RUN npm run build  

EXPOSE 3000  

CMD ["npm", "run", "start:prod"]
