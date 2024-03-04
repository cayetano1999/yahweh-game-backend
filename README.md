# Micro Promotions

[![Build Status](https://dev.azure.com/APAPDigital/APAP%20-%20Templates/_apis/build/status/nestjs-micro-backend-template?branchName=main)](https://dev.azure.com/APAPDigital/APAP%20-%20Templates/_build?definitionId=305)
# Descripcion del Template
La finalidad de este microservicio es servir como eje principal para la creacion de promociones y productos preaprobados para la aplicacion Movil, este esta hecho con [NestJs](https://nestjs.com/).

**Tabla de contenido**
<!-- La tabla de contenido se genera de forma automática utilizando la extensión de visual studio code Markdown All in One (yzhang.markdown-all-in-one). -->

- [Micro Promotions](#typescript-micro-backend-template)
  - [**Especificaciones**](#especificaciones)
  - [**Composición**](#composición)
  - [**Instalación**](#instalación)
    - [**Variables de Entorno**](#variables-de-entorno)
  - [**Uso**](#uso)
  - [**Contribución**](#contribución)

## **Especificaciones**
<!-- Información técnica del microservicio tales como librerías/paquetes del que depende, tecnologías utilizadas, frameworks, entre otros de la misma índole. -->
### Tecnologías utilizadas

* [NestJs](https://nestjs.com/) 
* [Redis](https://redis.io/)
* [RabbitMQ](https://www.rabbitmq.com/)
* [Jest](https://jestjs.io/)
* [TypeScript](https://www.typescriptlang.org/)
* [Visual Studio Code IDE](https://code.visualstudio.com/)
* [GIT](https://git-scm.com/)
* [Docker](https://www.docker.com/)
* [Mongoose](https://mongoosejs.com/)

### Librerías utilizadas (propias de APAP)
* [@apap/logger]
* [@apap/event-manager]
* [@apap/encryptor]
* [@apap/token-manager]
## **Composición**
<!-- Estructura de archivos/elementos que componen el microservicio. Se recomienda solo colocar lo contenido dentro de la carpeta src y que corresponda al desarrollo realizado. -->
### Árbol de estructura del proyecto: 
.\
├── .azdevops\
├── dist\
├── src/\
│   ├── modules/\
│   │   ├── cache/\
│   │   │   ├── config\
│   │   │   ├── interfaces\
│   │   │   └── services\
│   │   ├── config\
│   │   ├── database/\
│   │   │   └── config\
│   │   ├── http/\
│   │   │   └── config\
│   │   ├── logger/\
│   │   │   └── services\
│   │   └── rabbit\
|   |   |__ swagger\
|   |   |__ auth\
└── test\
|__ docs\


* `dist`: contiene los archivos resultado luego de ejecutar `npm run build`.
* `.azdevops`: contiene los archivos relacionados a los stages del [pipeline]() del proyecto.
* `src`: contiene los archivos de la codificación de todo el proyecto.
* `src/modules/common`: contiene todos los archivos relacionados a los [modulos](https://docs.nestjs.com/modules) comunes del proyecto.
* `src/modules/common/cache`: contiene las clases,servicios,controladores e interfaces relacionados al modulo de cache del proyecto.
* `src/modules/common/database`: contiene las clases,servicios,controladores e interfaces relacionados al modulo de base de datos del proyecto.
* `src/common/http`: contiene las clases,servicios,controladores e interfaces relacionados al modulo de http del proyecto.
* `src/common/logger`: contiene las clases,servicios,controladores e interfaces relacionados al modulo de logger del proyecto.
* `src/common/rabbit`: contiene las clases,servicios,controladores e interfaces relacionados al modulo de rabbitMQ del proyecto.
* `src/common/filters`: contiene las clases especificas para los filtros de peticiones HTTP. del microservicio.
* `src/common/filters`: contiene las clases especificas para los Middlewares de peticiones HTTP. del microservicio.
* `src/common/swagger`: contiene las configuracion de documentacion del proyecto, tipicamente esta en la ruta `api/docs`, El cual debe de destar totalmente deshabilitado cuando la APP se despliegue a producción.
* `src/modules/**/.module.ts*`: contiene los modulos de uso especifico del proyecto.
* `src/modules/auth`: contiene el modulo inicial para la autorizacion del proyecto.
* `test`: contiene los unit tests del proyecto.
* `docs`: contiene la documentacion de peticiones del microservicio

## **Instalación**
<!-- En esta sección se detallan los pasos necesarios para llevar a cabo una correcta instalación y uso del microservicio. -->
1. Descarga e instala [NodeJS](https://nodejs.org/en/).
2. Descarga e instala [NestJs](https://nestjs.com/).
3. Descarga e instala desde la ventana de comandos con docker, una imagen de [MongoDB](https://www.mongodb.com/) desde [Docker Hub](https://hub.docker.com/_/mongo).
4. Luego de la descarga ejecuta el siguiente script:  
    `docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=[USUARIO] -e MONGO_INITDB_ROOT_PASSWORD=[CLAVE] -p 3033:27017 -d mongo --replSet mongodb-replica-set`  
    1. Luego que mongo esté corriendo, para agregar tu usario ejecuta el siguiente script:  
5. Descarga e instala desde la ventana de comandos con docker, una imagen de [Redis](https://redis.io/) desde [Docker Hub](https://hub.docker.com/_/redis/).
6. Luego de la descarga ejecuta el siguiente script:  
    `docker run --name redis-store -p 3032:6379 -d redis redis-server --appendonly yes`
7. Descarga e instala desde la ventana de comandos con docker, una imagen de [RabbitMQ](https://www.rabbitmq.com/) desde [Docker Hub](https://hub.docker.com/_/rabbitmq).
8. Luego de la descarga ejecuta el siguiente script:  
    `docker run --name rabbitmq-management -e RABBITMQ_DEFAULT_USER=[USERNAME] -e RABBITMQ_DEFAULT_PASS=[PASSWORD]  -p 3030:15672 -p 3031:5672 -d rabbitmq:3-management`
9. Descarga e instala [Visual Studio Code IDE](https://code.visualstudio.com/).
10. Descarga e instala [GIT](https://git-scm.com/).
11. Crea el folder se va alojar el proyecto en el lugar deseado.
12. Haz click derecho dentro de la carpeta y selecciona **_GIT Bash here_**.
13. En la ventana de comandos de GIT ejecuta el siguiente script para deshabilitar la verificación SSL:  
    `git config --global http.sslVerify "false"`
14. Ejecuta los siguientes scripts para poner tu información como desarrollador:  
    `git config user.name "[PRIMER_NOMBRE] [PRIMER_APELLIDO]"`  
    `git config user.email "[USUARIO_DE_WINDOWS]@apap.com.do"`
15. Ejecuta el siguiente script para clonar el proyecto:  
    `git clone https://dev.azure.com/APAPDigital/APAP%20-%20Templates/_git/typescript-micro-nestjs-backend-template`
16. Abre el proyecto desde Visual Studio Code.
17. En la ventana de comandos ejecuta el siguiente script para instalar todas las dependencias:  
    `npm run refreshToken`
17. En la ventana de comandos ejecuta el siguiente script para instalar todas las dependencias:  
    `npm install`
18. Comandos disponibles:
    * **build**: `npm run build`, construir los output files de los `*.ts`.
    * **lint**: `npm run lint`, para que el linter valide las reglas de código.
    * **test:cov**: `npm run test`,  inicialicen todas las pruebas unitarias y genera coverage.
    * **start:dev**: `npm run start:dev`,  inicializar proyecto con Nodemon.
    * **start**: `npm run start`,  inicializar proyecto a partir de los `.dist` files.
### **Variables de Entorno**

A continuación, se listan las variables de entorno utilizadas en el microservicio:

|Variable|Tipo|Comentario|
|-|-|-|
|PORT|number|Variable de entorno para especificar el puerto|
|DATABASE_URL|string|Variable de entorno para especificar host de la base de datos|
|DATABASE_NAME|number|Variable de entorno para especificar el puerto de la base de datos|
|HTTP_TIMEOUT|number|Variable de entorno para especificar el tiempo de espera en una peticion HTTP|
|HTTP_MAX_REDIRECTS|number|Variable de entorno para la cantidad maxima de redireccines HTTP por peticion.|
|KEYCLOAK_CLIENT|string|Variable de entorno para especificar URL del cliente de Keycloak|
|KEYCLOAK_CLIENT_SECRET|number|Variable de entorno para especificar el secret del cliente de keycloak|
|KEYCLOAK_USER_NAME|string|Variable de entorno para especificar el usuario de servicio de Keycloak|
|KEYCLOAK_PASSWORD|number|Variable de entorno para especificar la contraseña del usuario de servicio de Keycloak|
|KEYCLOAK_REALM|boolean|Variable de entorno para especificar reino de Keycloak|
|CACHE_HOST|string|Variable de entorno para especificar el HOST de Redis|
|CACHE_PORT|number|Variable de entorno para especificar el puerto de Redis|
|CACHE_PASSWORD|string|Variable de entorno para especificar la contraseña del usuario de Redis|
|CACHE_REDIS_DATABASE_NUMBER|number|Variable de entorno para especificar el nombre de base de datos de Redis|
|CACHE_TTL|number|Variable de entorno para especificar el tiempo en que duran las llaves de redis|
|APP_NAME|string|Variable de entorno para especificar el nombre del microservicio|
|APP_VERSION|number|Variable de entorno para especificar la version del microservicio|
|APP_DESCRIPTION|number|Variable de entorno para especificar una descripcion del microservicio|


## **Contribución**

Ver [contribución](./CONTRIBUTING.md)
## **Documentacion de peticiones**

Ver [Documentacion](./docs/requests.doc.md)