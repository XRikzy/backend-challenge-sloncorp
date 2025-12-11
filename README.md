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

## ¿Como funciona el backend?

Este backend es de tipo API RestFul donde, sin contar la ruta de auth mantiene una solo ruta CRUD para sites, ahora explicare que proceso se realizo para la configuracion de esta base de datos:

### 1. Base de datos:

Decidi usar el proveedor de base de datos SUPABASE, debido a su simplicidad en los procesos de creacion, su escalado, facilidad para interpretar datos e implementación interpretadores de base de datos eficientemente como son los ORMS.

### 2. Framework:

Seleccioné NestJS porque proporciona una arquitectura modular y opinada, ideal para aplicaciones escalables y mantenibles. A diferencia de Express, NestJS ofrece una estructura clara basada en decoradores, inyección de dependencias y módulos, lo que facilita la legibilidad y escalabilidad del código. Además, incluye soporte integrado para TypeORM, validación de datos y documentación automática con Swagger, mejorando significativamente la productividad del desarrollo.

### 3. BUCKET S3 AWS:

Usé AWS debido a que nunca he usado este cloud y queria aprender su usó, ademas de que es de lo mejores, si no el mejor, bucket de imagenes actualmente, para ello debi familiarizarme con algunos procesos y poder implementarlo, saber como usar el empaquetador official para javascript AWS SDK CLIENT S3 fue un reto para mi debido a que desconocia este empaquetador pero el aprendizaje fue util para conocer mejor este sistema cloud.

### 4. Implementación:

Para la implementación mi enfoque fue el sugerido por la prueba solo agregando un pequeño cambio, agrege un control de datos de los sitos por usuario, ¿Qué significa esto? que dependiendo del usuario los datos de site se mostraran como propios, ningún otro usuario podra ver los datos de otro.
Para poder controlar estos necesité el id de usuario para acceder a sus datos exactos, la cual se proporciona con un Custom Decorator de nombre @GetUser() donde si no se pasa un dato especifico pasa todos los datos del usuario, en este caso el id.
Para las operaciones con sitios, utilicé DTOs con validadores de class-validator para asegurar la integridad de los datos que llegan desde el cliente,
En el servicio. Cada operación valida que el usuario sea propietario del recurso. Las entidades se modelaron con TypeORM, estableciendo relaciones entre usuarios, sitios y contactos. El manejo de errores utiliza excepciones de NestJS específicas: ConflictException para duplicados, NotFoundException para recursos no encontrados, y logs de error para fallos en S3, cuando se sube un archivo correctamente, cuando falla, cuando no se puede eliminar, cuando se elimina etc.

## Despliegue

- Vercel

## Resources

- NestJs [NestJs Documentación](https://docs.nestjs.com/)
- AWS SDK [AWS SDK JAVACRIPT](https://docs.aws.amazon.com/sdk-for-javascript/)
- Supabase [Supabase Documentación](https://supabase.com/docs/guides/database/overview)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
