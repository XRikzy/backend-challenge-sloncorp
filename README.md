<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<p align="center">
  <h1>Sites Management API - Backend (NestJS)</h1>
</p>

## Descripción

API RESTful completa para gestión de sitios con autenticación JWT, integración con Supabase PostgreSQL y AWS S3.

## Tecnologias

- NestJS - Framework backend de Node.js
- TypeORM - ORM para PostgreSQL
- Supabase - Base de datos PostgreSQL
- AWS S3 - Almacenamiento de imágenes
- JWT - Autenticación
- bcrypt - Hashing de contraseñas

## Entorno y Servicios usados

- NodeJs (v22.12.5)
- npm
- AWS S3
- Supabase (Cloud para base de datos tipo postgress)

## Instalación del proyecto

1. Clonar repositorio

```
$~ git clone https://github.com/XRikzy/backend-challenge-sloncorp
$~ cd backend-challenge-sloncorp
```

2. Instalar dependecias

```
$~ npm i
```

3. Configurar variables de entorno

Crear archivo `.env` con las variables necesarias:

```
PORT=3000
DATABASE_URL=urlfromsupabase
AWS_ACCESS_KEY_ID=access_key
AWS_SECRET_ACCESS_KEY=secret_key
AWS_S3_BUCKET=bucket_name
AWS_S3_REGION=us-east-1
AWS_S3_SITES_FOLDER=sites/
JWT_SECRET=jwt_secret
JWT_EXPIRATION=86400
```
Se proporcionará los env necearios para correr el sitio si es necesario

4. Correr proyecto

- Para desarrollo

```
$~ npm run start:dev
```

- Para producción

```
 $~ npm run build
 $~ npm run start:prod
```

## Documentación de Endpoints

La documentación interactiva de todos los endpoints está disponible en **Swagger UI** una vez que el servidor esté corriendo:

```
http://localhost:3000/api/docs
```

Aquí se puede:
- Ver todos los endpoints disponibles organizados por etiquetas (Auth y Sites)
- Probar los endpoints directamente desde la UI
- Autorizar con JWT para endpoints protegidos
- Ver ejemplos de solicitudes y respuestas

### Endpoints principales:

**Autenticación:**
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión
- `GET /auth/profile` - Obtener perfil del usuario (requiere JWT)
- `GET /auth/check` - Verificar validez del token (requiere JWT)

**Sitios:**
- `POST /sites` - Crear nuevo sitio con imagen y contactos
- `GET /sites` - Obtener todos los sitios del usuario
- `GET /sites/:id` - Obtener sitio específico
- `PATCH /sites/:id` - Actualizar sitio
- `DELETE /sites/:id` - Eliminar sitio

## ¿Como funciona el backend?

Este backend es de tipo API RestFul donde, mantiene una solo ruta CRUD para sites, ahora explicare que proceso se realizo para la configuracion de este backend:

### 1. Base de datos:

Decidi usar el proveedor de base de datos SUPABASE, debido a su simplicidad en los procesos de creacion, su escalado, facilidad para interpretar datos e implementación de interpretadores de base de datos eficientemente como son los ORMS.

### 2. Framework:

Seleccioné NestJS porque proporciona una arquitectura modular y opinada, ideal para aplicaciones escalables y mantenibles, ademas de ser el que mas domino. A diferencia de Express, NestJS tiene una estructura clara basada en decoradores, inyección de dependencias y módulos, y esto facilita la legibilidad y escalabilidad del código. Además, incluye soporte integrado para TypeORM, validación de datos y documentación automática con Swagger, mejorando significativamente la productividad del desarrollo.

### 3. BUCKET S3 AWS:

Utilicé AWS porque nunca he usado este servicio en la nube y quería aprender su uso. Además, es uno de los mejores, si no el mejor, proveedor de almacenamiento de imágenes actualmente. Para ello, debí familiarizarme con algunos procesos para poder implementarlo y saber cómo usar el paquete oficial de AWS SDK Client S3 para JavaScript. Fue un reto para mí debido a que desconocía este paquete, pero el aprendizaje fue útil para conocer mejor este servicio en la nube.

### 4. Implementación:

Para la implementación, mi enfoque fue el sugerido por la prueba, solo agregando un pequeño cambio: añadí un control de datos de los sitios por usuario. ¿Qué significa esto? Que, dependiendo del usuario, los datos del sitio se mostrarán como propios; ningún otro usuario podrá ver los datos de otro.

Para poder controlar esto, necesité el ID de usuario para acceder a sus datos exactos, el cual se proporciona con un decorador personalizado llamado `@GetUser()`. Si no se pasa un dato específico, se devuelven todos los datos del usuario, en este caso, el ID.

Para las operaciones con sitios, utilicé DTOs con validadores de `class-validator` para asegurar la integridad de los datos que llegan desde el cliente. En el servicio, cada operación valida que el usuario sea propietario del recurso. Las entidades se modelaron con TypeORM, estableciendo relaciones entre usuarios, sitios y contactos. El manejo de errores utiliza excepciones específicas de NestJS: `ConflictException` para duplicados, `NotFoundException` para recursos no encontrados, y logs de error para fallos en S3, indicando cuándo se sube un archivo correctamente, cuándo falla, cuándo no se puede eliminar, y cuándo se elimina, etc.

## Despliegue

- Vercel

## Resources

- NestJs [NestJs Documentación](https://docs.nestjs.com/)
- AWS SDK [AWS SDK JAVACRIPT](https://docs.aws.amazon.com/sdk-for-javascript/)
- Supabase [Supabase Documentación](https://supabase.com/docs/guides/database/overview)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
