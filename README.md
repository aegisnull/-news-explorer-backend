# news-explorer-backend

news-explorer-backend es un servicio de backend para recuperar y analizar noticias de diversas fuentes. El servicio está construido usando Node.js y Express.

El servicio de backend se utiliza en conjunto con el [frontend de news-explorer](https://github.com/aegisnull/news-explorer-frontend) para registrar usuarios, iniciar sesión, guardar y eliminar artículos de noticias.

## Características

- Registrar usuarios
- Iniciar sesión
- Guardar artículos de noticias
- Eliminar artículos de noticias

## Requisitos previos

- Node.js 10.0 o superior
- npm

## Instalación

1. Clone el repositorio:
   `git clone https://github.com/aegisnull/news-explorer-backend.git`

2. Navegue al directorio:
   `cd news-explorer-backend`

3. Instale los paquetes necesarios:
   `npm install`

4. Establezca las siguientes variables de entorno:
   _PORT:_ El puerto en el que se ejecutará el servidor de desarrollo
   _DATABASE_URI:_ URI para la base de datos que se utilizará para almacenar los artículos. Esto puede ser una base de datos local o un servicio basado en la nube como MongoDB Atlas.

5. Ejecute el servidor de desarrollo:
   `npm start`

6. Despliegue

news-explorer-backend se puede desplegar en una variedad de plataformas de hosting, como Heroku o AWS. Simplemente siga las instrucciones de la plataforma de hosting para desplegar una aplicación Node.js y asegúrese de establecer las variables de entorno necesarias.

## Uso

El servidor esta hospedado en Google Cloud y puede ser accedido el Frontend [aegisnews.students.nomoredomainssbs.ru](https://aegisnews.students.nomoredomainssbs.ru/).

El backend está disponible a través de [https://api.aegisnews.students.nomoredomainssbs.ru/](https://api.aegisnews.students.nomoredomainssbs.ru/).

## Rutas

### POST /signup

Registra un nuevo usuario.

#### Parámetros

- `name` - Nombre del usuario
- `email` - Correo electrónico del usuario
- `password` - Contraseña del usuario

#### Respuesta

- `200` - Usuario registrado con éxito
- `400` - Error de validación
- `409` - El usuario ya existe

### POST /signin

Inicia sesión con un usuario existente.

#### Parámetros

- `email` - Correo electrónico del usuario
- `password` - Contraseña del usuario

#### Respuesta

- `200` - Inicio de sesión exitoso
- `400` - Error de validación
- `401` - Credenciales inválidas

### GET /users/me

Obtiene información del usuario actual.

#### Parámetros

- `Authorization` - Token de autenticación del usuario

#### Respuesta

- `200` - Información del usuario
- `401` - Token de autenticación inválido

### GET /articles

Obtiene todos los artículos de noticias guardados por el usuario actual.

#### Parámetros

- `Authorization` - Token de autenticación del usuario

#### Respuesta

- `200` - Lista de artículos de noticias
- `401` - Token de autenticación inválido

### POST /articles

Guarda un nuevo artículo de noticias.

#### Parámetros

- `keyword` - Palabra clave del artículo
- `title` - Título del artículo
- `text` - Texto del artículo
- `date` - Fecha de publicación del artículo
- `source` - Fuente del artículo
- `link` - Enlace al artículo
- `image` - Imagen del artículo
- `Authorization` - Token de autenticación del usuario

#### Respuesta

- `200` - Artículo de noticias guardado con éxito
- `400` - Error de validación
- `401` - Token de autenticación inválido

### DELETE /articles/:articleId

Elimina un artículo de noticias.

#### Parámetros

- `articleId` - ID del artículo de noticias
- `Authorization` - Token de autenticación del usuario

#### Respuesta

- `200` - Artículo de noticias eliminado con éxito
- `401` - Token de autenticación inválido
- `404` - Artículo de noticias no encontrado

## Créditos

news-explorer-backend fue creado por [AegisNull](https://github.com/aegisnull)
