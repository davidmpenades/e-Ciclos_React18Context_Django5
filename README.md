# e-Move

Esta aplicación esta disesñada para el alquiler de bicicletas eléctricas en el ambito urbano.
Puede seguir el siguiente tutorial para descargarlo y probarlo.

![image](https://github.com/davidmpenades/e-Move_React18Context_Django5/assets/118437119/b0f17d6b-5299-4582-ae3b-154072143eeb)

## Primero

### Clonar el Repositorio
Para comenzar, clona este repositorio en tu máquina local utilizando el siguiente comando:

```
git clone https://github.com/davidmpenades/e-Move_React18Context_Django5.git

```

Una vez clonado el repositorio, accede al directorio del proyecto:

```

cd e-Move_React18Context_Django5

```

Cambiamos de rama a:

```

git checkout main-docker-compose

```

### Instalación de Dependencias en el Frontend

Ya dentro del directorio del proyecto ejecuta el siguiente comando, esto nos intalará las dependencias de react:

```

cd Frontend &&
npm install &&
cd ..

```

## Levantar Docker

### Requisitos Previos

Antes de comenzar con la configuración y ejecución de la aplicación e-Move, asegúrate de tener instalados los siguientes requisitos:

### Docker

Es necesario tener Docker instalado en tu sistema. Docker es una plataforma que permite desarrollar, enviar y ejecutar aplicaciones dentro de contenedores.

Puedes descargar e instalar Docker desde [Docker Hub](https://hub.docker.com/).

### Docker Desktop

Si estás utilizando Windows o macOS, se recomienda instalar Docker Desktop, que proporciona una experiencia de Docker completa, incluyendo el motor Docker, el CLI de Docker y Docker Compose.

Puedes descargar Docker Desktop desde [Docker Hub](https://hub.docker.com/).

### Empecemos

Para que arranque la aplicación por primera vez debemos ejecutar el siguiente comando:

```

docker-compose up --build

```

Lo podemos ver en un navegador en la siguiente URL:

```

localhost/

```

Si ya hemos creado el entorno de docker, solo hará falta levantar los contenedores con el siguiente comando:

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

# Configuración Docker Compose

Este repositorio contiene un archivo `docker-compose.yml` que configura varios servicios para un entorno de desarrollo local utilizando Docker Compose.

## Servicios

### PostgreSQL

El servicio `postgres` utiliza la imagen oficial de PostgreSQL y se configura con las siguientes características:

- Puerto del contenedor: `5432`
- Puerto del host: `5434`
- Nombre de usuario: `david`
- Contraseña: `1234`
- Volumen para persistir datos: `postgres_container:/var/lib/postgresql/data`
- Archivo de inicialización: `./postgresql/db_init.sql`

### Backend

El servicio `backend` se construye a partir de un `Dockerfile.backend` y se configura con las siguientes características:

- Puerto del contenedor: `8000`
- Puerto del host: `8001`
- Variables de entorno:
  - Usuario de PostgreSQL: `david`
  - Contraseña de PostgreSQL: `1234`
  - Host de PostgreSQL: `postgres_container`
  - Puerto de PostgreSQL: `5432`
  - Base de datos de PostgreSQL: `emove`
- Dependencias: `postgres`
- Volumen: `./Backend:/app`

### Frontend React

El servicio `frontend-react` se construye a partir del directorio `./Frontend` y se configura con las siguientes características:

- Puerto del contenedor: `5173`
- Puerto del host: `5173`
- Directorio de trabajo: `/app`
- Volumen: `./Frontend:/app`

## Instrucciones de Uso

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener Docker y Docker Compose instalados.
3. Navega al directorio del repositorio clonado.
4. Ejecuta el comando `docker-compose up` para iniciar los servicios.
5. Accede a la aplicación desde tu navegador utilizando los puertos especificados en cada servicio.

### Volúmenes

<li><b>postgres_container</b>: Define el volumen para persistir los datos de la base de datos PostgreSQL.</li>

Este archivo docker-compose.yml facilita la gestión y la ejecución de los servicios necesarios para la aplicación e-Move utilizando Docker Compose.


```
version: '3'

services:
  postgres:
    image: postgres:15
    container_name: postgres_container
    volumes:
      - postgres_container:/var/lib/postgresql/data
      - ./Backend/bk/exportacion.sql:/docker-entrypoint-initdb.d/exportacion.sql
    ports:
      - "5434:5432"
    environment:
      POSTGRES_USER: david
      POSTGRES_PASSWORD: 1234
    networks:
      - practica_net
      
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
    networks:
      - practica_net

  frontend-react:
    build:
      context: ./Frontend
    container_name: frontend_react
    working_dir: /app
    ports:
      - "5173:5173"
    volumes:
      - ./Frontend:/app
    networks:
      - practica_net

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin4_container
    restart: always
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_USER: david
      PGADMIN_DEFAULT_EMAIL: david@gmail.com
      PGADMIN_DEFAULT_PASSWORD: 1234
    volumes:
      - pgadmin-data:/var/lib/pgadmin
    networks:
          - practica_net

  nginx:
    image: nginx:latest
    container_name: nginx_loadbalancer
    ports:
      - "80:80"
    volumes:
      - ./loadbalancer/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - backend
      - frontend-react
    command: ["nginx", "-g", "daemon off;"]
    networks:
      - practica_net
      
volumes:
  postgres_container:
  pgadmin-data: {}

networks:
  practica_net: {}

```

### PgAdmin

PgAdmin es una herramienta de administración y desarrollo para bases de datos PostgreSQL. Proporciona una interfaz gráfica intuitiva para administrar objetos de base de datos, escribir y ejecutar consultas SQL, importar/exportar datos, monitorear el rendimiento y gestionar la seguridad de la base de datos. Es útil para aquellos que prefieren una GUI para trabajar con PostgreSQL en lugar de la línea de comandos.

Entrando a localhost:5050, estaremos en esta página de inicio:

![Captura desde 2024-02-22 19-32-17](https://github.com/davidmpenades/e-Move_React18Context_Django5/assets/118437119/2b2f5a69-1be3-47ed-aa1c-e2c376e8627f)

Como hemos configurado el docker-compose:

```

pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin4_container
    restart: always
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_USER: david
      PGADMIN_DEFAULT_EMAIL: david@gmail.com
      PGADMIN_DEFAULT_PASSWORD: 1234
    volumes:
      - pgadmin-data:/var/lib/pgadmin
    networks:
          - practica_net

```

Pondremos el email y el password que hayamos configurado, en este caso, david@gmail.com y 1234. Asi podremos entrar:

![image](https://github.com/davidmpenades/e-Move_React18Context_Django5/assets/118437119/f6fa6a73-fb85-4a03-bd2d-aaceb7ed86e5)

Una vez accedamos por primera vez, entraremos aquí:

![image](https://github.com/davidmpenades/e-Move_React18Context_Django5/assets/118437119/b89e2033-1a2a-4bc3-985b-60afe628aa22)

Boton derecho en servers>register>server como en la imagen:

![image](https://github.com/davidmpenades/e-Move_React18Context_Django5/assets/118437119/b39fc1b7-d3d5-44d0-9b36-3ad27e7bab9d)

En la pestaña general, en nombre, lo nombraremos como nos apetezca que se llame la base de datos:

![image](https://github.com/davidmpenades/e-Move_React18Context_Django5/assets/118437119/d6195112-bba9-4c4e-add1-c71c23f27f95)

En la pestaña connection, lo configuraciones de la siguiente forma y pulsamos en save:

![image](https://github.com/davidmpenades/e-Move_React18Context_Django5/assets/118437119/809d9784-646a-41a1-9487-f5d0a1f30437)

Ya podremos ver nuestra nueva base de datos:

![image](https://github.com/davidmpenades/e-Move_React18Context_Django5/assets/118437119/32f35955-a8c1-4a61-bd98-73fd6426300e)

Con boton derecho en por ejemplo, bikes, y en view/editData>view rows:

![image](https://github.com/davidmpenades/e-Move_React18Context_Django5/assets/118437119/349baca0-e3c5-4f0a-b231-2fce973895a6)

Veremos los datos de la tabla bikes:

![image](https://github.com/davidmpenades/e-Move_React18Context_Django5/assets/118437119/80e1c905-0c31-4c9f-9c56-7eb61842ff47)

# Configuración de Nginx como Balanceador de Carga

Este archivo `docker-compose.yml` configura un servidor Nginx como un balanceador de carga para los servicios `backend` y `frontend-react`.

## Servicio Nginx

```yaml
nginx:
  image: nginx:latest
  container_name: nginx_loadbalancer
  ports:
    - "80:80"
  volumes:
    - ./loadbalancer/nginx.conf:/etc/nginx/nginx.conf:ro
  depends_on:
    - backend
    - frontend-react
  command: ["nginx", "-g", "daemon off;"]
  networks:
    - practica_net
```

## Puertos que utliza e-Move

| Archivo               | Puertos Expuestos    |
|-----------------------|----------------------|
| Dockerfile.frontend   | Puerto 5173          |
| docker-compose.yml    | - 5434:5432 (PostgreSQL) |
|                       | - 8001:8000 (Backend)    |
|                       | - 5173:5173 (Frontend)   |
| PgAdmin               | - 5050                   | 
| Loadbalancer          | / (frontend)             |
|                       | /api/ (backend)          |
