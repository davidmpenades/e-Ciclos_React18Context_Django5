# e-Move

Esta aplicación esta disesñada para el alquiler de bicicletas eléctricas en el ambito urbano.
Puede seguir el siguiente tutorial para descargarlo y probarlo.

## Primero

### Clonar el Repositorio
Para comenzar, clona este repositorio en tu máquina local utilizando el siguiente comando:

```
https://github.com/davidmpenades/e-Move_React18Context_Django5.git
```

Una vez clonado el repositorio, accede al directorio del proyecto

### Instalación de Dependencias en el Frontend

Para instalar las dependencias del Frontend, accede al directorio Frontend y ejecuta el siguiente comando:

```

cd Frontend
npm install

```

### Levantar Docker

Para que arranque la aplicación por primera vez debemos ejecutar el siguiente comando:

```

docker-compose up --build

```

Lo podemos ver en un navegador en la siguiente URL:

```

localhost:5173

```

Si ya hemos creado el entorno de docker el siguiente comando:

```

docker-compose up

```
Si realizamos algun cambio en el código deberemos utilizar el primer comando, para contruir de nuevo el proyecto.

## Explicación de la dockerización

## Dockerfile para la Construcción del Frontend

Este Dockerfile se utiliza para construir la imagen del Frontend de la aplicación e-Move.

### Etapa 1: Constructor
En esta etapa, se utiliza la imagen base de node:20 como base para construir la aplicación. Se establece el directorio de 
trabajo en /app y se copian los archivos de configuración de npm, incluyendo package.json y package-lock.json. Luego, se 
instalan las dependencias del proyecto utilizando el comando npm install --production.

### Etapa 2: Final

En esta etapa final, se utiliza una imagen más ligera node:20-slim. Se establece nuevamente el directorio de trabajo en /app 
y se copian los archivos generados en la etapa de construcción. Además, se copian todos los archivos del proyecto al directorio 
de trabajo. Se expone el puerto 5173 para que la aplicación pueda ser accedida desde fuera del contenedor. Por último, se define 
el comando por defecto para ejecutar la aplicación en modo de desarrollo con el comando npm run dev.

Este Dockerfile permite construir una imagen lista para ejecutar el Frontend de la aplicación e-Move.

```
# Etapa 1: Constructor
FROM node:20 AS constructor

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos de configuración de npm
COPY package.json .
COPY package-lock.json .

# Instalar las dependencias del proyecto
RUN npm install --production

# Etapa 2: Final
FROM node:20-slim

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos generados en la etapa de construcción
COPY --from=constructor /app .

# Copiar todos los archivos del proyecto
COPY . .

# Exponer el puerto 5173
EXPOSE 5173

# Comando por defecto para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
 explica para el readme.md este dockerfile

```

## Dockerfile para la Aplicación Backend de e-Move

Este Dockerfile se utiliza para construir la imagen del Backend de la aplicación e-Move.

FROM python:3: Utiliza la imagen base de Python 3 como base para construir la aplicación Backend.

ENV PYTHONUNBUFFERED 1: Establece la salida sin búfer para Python, lo que garantiza que la salida del código Python se muestre inmediatamente en la consola.

RUN apt-get update && apt-get install -y postgresql-client: Instala el cliente PostgreSQL para permitir la conexión con una base de datos PostgreSQL.

WORKDIR /app: Establece el directorio de trabajo dentro del contenedor en /app, donde se ubicará el código de la aplicación.

COPY ./Backend/requirements.txt .: Copia el archivo requirements.txt que contiene las dependencias de la aplicación al directorio de trabajo del contenedor.

RUN pip install -r requirements.txt: Instala las dependencias de la aplicación utilizando pip.

COPY ./Backend .: Copia todo el código fuente de la aplicación Backend al directorio de trabajo del contenedor.

COPY ./Backend/wait-for-postgres.sh /app/wait-for-postgres.sh: Copia el script wait-for-postgres.sh al directorio de trabajo del contenedor. Este script se utiliza para esperar a que el servicio de PostgreSQL esté disponible antes de iniciar la aplicación.

RUN chmod +x /app/wait-for-postgres.sh: Establece permisos de ejecución para el script wait-for-postgres.sh.

RUN chmod +x /app/django.sh: Establece permisos de ejecución para el script django.sh, que se utiliza como punto de entrada para iniciar la aplicación.

EXPOSE 8000: Expone el puerto 8000 para que la aplicación pueda ser accedida desde fuera del contenedor.

ENTRYPOINT ["/app/django.sh"]: Establece el script django.sh como punto de entrada para iniciar la aplicación Backend cuando se inicie el contenedor.

Este Dockerfile permite construir una imagen lista para ejecutar el Backend de la aplicación e-Move en un contenedor Docker.

```
FROM python:3  
# # Set unbuffered output for python 
ENV PYTHONUNBUFFERED 1  
# # Install PostgreSQL client 
 RUN apt-get update && apt-get install -y postgresql-client  
#Create app directory 
WORKDIR /app  
#Install app dependencies 
COPY ./Backend/requirements.txt .   
RUN pip install -r requirements.txt  
# Bundle app source 
COPY ./Backend .    
#Copy wait-for-postgres.sh script 
COPY ./Backend/wait-for-postgres.sh /app/wait-for-postgres.sh 
RUN chmod +x /app/wait-for-postgres.sh   
 #Set executable permissions for scripts 
RUN chmod +x /app/django.sh  
 # # Expose port 
EXPOSE 8000 

ENTRYPOINT [ "/app/django.sh" ]

```

## Configuración de la Base de Datos

Estas instrucciones SQL se utilizan para configurar la base de datos necesaria para la aplicación e-Move y asignar privilegios a un usuario 
específico. Aquí tienes una explicación de cada paso:

Creación de la Base de Datos: CREATE DATABASE emove;

Esta instrucción crea una nueva base de datos llamada "emove".
Conexión a la Base de Datos: \c emove;

Con esta instrucción, se conecta a la base de datos "emove" recién creada. Esto es útil para ejecutar comandos dentro de esa base de datos.
Creación de Usuario y Asignación de Privilegios:

```

CREATE USER david WITH PASSWORD '1234';
ALTER ROLE david SET client_encoding TO 'utf8';
ALTER ROLE david SET default_transaction_isolation TO 'read committed';
ALTER ROLE david SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE emove TO david;

```

Se crea un nuevo usuario llamado "david" con la contraseña "1234".
Se establecen varias configuraciones para el usuario "david", incluyendo la codificación de caracteres, el nivel de aislamiento de transacción 
y la zona horaria.
Se otorgan todos los privilegios sobre la base de datos "emove" al usuario "david".

## docker-compose.yml para e-Move

Este archivo docker-compose.yml se utiliza para definir y ejecutar los servicios necesarios para la aplicación e-Move, incluyendo el servidor de base de 
datos PostgreSQL, el backend y el frontend.

### Servicio PostgreSQL
<ul>
  <li><b>Imagen</b>: Utiliza la imagen oficial de PostgreSQL para crear el servicio de base de datos.</li>
  <li><b>Container Name</b>: Establece el nombre del contenedor como postgres_container.</li>
  <li><b>Volúmenes</b>: Mapea el volumen postgres_container al directorio donde se almacenan los datos de PostgreSQL dentro del contenedor. Además, monta el 
  archivo db_init.sql en el directorio de inicialización de la base de datos.</li>
  <li><b>Puertos</b>: Mapea el puerto 5432 del contenedor al puerto 5434 del host.</li>
  <li><b>Variables de entorno</b>: Define el nombre de usuario y la contraseña para acceder a la base de datos PostgreSQL.</li>
</ul>


### Servicio Backend

<li><b>Build</b>: Utiliza el Dockerfile definido en el directorio raíz del proyecto para construir la imagen del backend.</li>
<li><b>Container Name</b>: Establece el nombre del contenedor como backend_container.</li>
<li></li><b>Variables de entorno</b>: Define las variables de entorno necesarias para la conexión con la base de datos PostgreSQL, incluyendo el usuario, 
la contraseña, el host, el puerto y el nombre de la base de datos.</li>
<li><b>Volúmenes</b>: Monta el directorio ./Backend del host en el directorio /app del contenedor, lo que permite el desarrollo en tiempo real.</li>
<li><b>Depends On</b>: Establece la dependencia del servicio backend sobre el servicio PostgreSQL, asegurando que el backend espere hasta que PostgreSQL 
esté completamente iniciado antes de iniciar.</li>
<li><b>Puertos</b>: Mapea el puerto 8000 del contenedor al puerto 8001 del host, lo que permite acceder al backend desde fuera del contenedor.</li>

### Servicio Frontend

<li><b>Build:</b> Utiliza el directorio ./Frontend para construir la imagen del frontend React.</li>
<li><b>Container Name</b>: Establece el nombre del contenedor como frontend_react.</li>
<li><b>Directorio de trabajo</b>: Establece el directorio de trabajo dentro del contenedor en /app, donde se encuentra el código del frontend.</li>
<li><b>Puertos</b>: Mapea el puerto 5173 del contenedor al puerto 5173 del host, permitiendo acceder al frontend desde fuera del contenedor.</li>
<li><b>Volúmenes</b>: Monta el directorio ./Frontend del host en el directorio /app del contenedor, lo que permite el desarrollo en tiempo real.</li>

### Volúmenes

<li><b>postgres_container</b>: Define el volumen para persistir los datos de la base de datos PostgreSQL.</li>

Este archivo docker-compose.yml facilita la gestión y la ejecución de los servicios necesarios para la aplicación e-Move utilizando Docker Compose.

```
version: '3'

services:
  postgres:
    image: postgres
    container_name: postgres_container
    volumes:
      - postgres_container:/var/lib/postgresql/data
      - ./postgresql/db_init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5434:5432"
    environment:
      POSTGRES_USER: david
      POSTGRES_PASSWORD: 1234
      

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    container_name: backend_container
    environment:
      - PG_USER=david
      - PG_PASSWORD=1234
      - PG_HOST=postgres_container
      - PG_PORT=5432
      - PG_DB=emove
    volumes:
      - ./Backend:/app
    depends_on:
      - postgres
    ports:
      - "8001:8000"

  frontend-react:
    build:
      context: ./Frontend
    container_name: frontend_react
    working_dir: /app
    ports:
      - "5173:5173"
    volumes:
      - ./Frontend:/app

volumes:
  postgres_container:

```

## Puertos que utliza e-Move

| Archivo               | Puertos Expuestos    |
|-----------------------|----------------------|
| Dockerfile.frontend   | Puerto 5173          |
| docker-compose.yml    | - 5434:5432 (PostgreSQL) |
|                       | - 8001:8000 (Backend)    |
|                       | - 5173:5173 (Frontend)   |
