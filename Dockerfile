# Usa una imagen base de Node.js 
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install


# Copiamos el resto de archivos del proyecto
COPY . .
RUN ls -la node_modules/.bin/ && node_modules/.bin/next --version

# Puerto donde se ejecutará la app Next.js en modo desarrollo
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]