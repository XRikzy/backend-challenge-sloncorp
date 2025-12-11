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

## Description

Complete RESTful API for sites management with JWT authentication, Supabase PostgreSQL integration, and AWS S3.

## Technologies

- NestJS - Node.js backend framework
- TypeORM - ORM for PostgreSQL
- Supabase - PostgreSQL database
- AWS S3 - Image storage
- JWT - Authentication
- bcrypt - Password hashing

## Environment and Services Used

- NodeJs (v22.12.5)
- npm
- AWS S3
- Supabase (PostgreSQL cloud database)

## Project Installation

1. Clone the repository

```
$~ git clone https://github.com/XRikzy/backend-challenge-sloncorp
$~ cd backend-challenge-sloncorp
```

2. Install dependencies

```
$~ npm i
```

3. Configure environment variables

Create a `.env` file with the necessary variables:

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

Required environment variables will be provided if needed.

4. Run the project

- For development

```
$~ npm run start:dev
```

- For production

```
 $~ npm run build
 $~ npm run start:prod
```

## Endpoints Documentation

The interactive documentation for all endpoints is available in **Swagger UI** once the server is running:

```
http://localhost:3000/api/docs
```

Here you can:
- View all available endpoints organized by tags (Auth and Sites)
- Test endpoints directly from the UI
- Authorize with JWT for protected endpoints
- See examples of requests and responses

### Main endpoints:

**Authentication:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (requires JWT)
- `GET /auth/check` - Verify token validity (requires JWT)

**Sites:**
- `POST /sites` - Create new site with image and contacts
- `GET /sites` - Get all user sites
- `GET /sites/:id` - Get specific site
- `PATCH /sites/:id` - Update site
- `DELETE /sites/:id` - Delete site

## How the Backend Works

This backend is a RESTful API that maintains a single CRUD route for sites. Below I explain the process used for configuring this backend:

### 1. Database:

I decided to use the Supabase database provider due to its simplicity in creation processes, scalability, ease of data interpretation, and efficient implementation of database interpreters like ORMs.

### 2. Framework:

I chose NestJS because it provides a modular and opinionated architecture, ideal for scalable and maintainable applications. Unlike Express, NestJS has a clear structure based on decorators, dependency injection, and modules, which facilitates code readability and scalability. Additionally, it includes built-in support for TypeORM, data validation, and automatic documentation with Swagger, significantly improving development productivity.

### 3. AWS S3 Bucket:

I used AWS because I had never used this cloud service before and wanted to learn how to use it. Additionally, it is one of the best, if not the best, image storage providers available. To do this, I had to familiarize myself with some processes to implement it and learn how to use the official AWS SDK Client S3 package for JavaScript. It was a challenge for me because I was unfamiliar with this package, but the learning experience was useful for better understanding this cloud service.

### 4. Implementation:

For the implementation, my approach followed the suggested guidelines, with one small addition: I added user-based data control for sites. What does this mean? Depending on the user, site data will be displayed as their own; no other user can see another user's data.

To control this, I needed the user ID to access their exact data, which is provided by a custom decorator called `@GetUser()`. If no specific data is passed, all user data is returned, in this case, the ID.

For site operations, I used DTOs with `class-validator` validators to ensure data integrity from the client. In the service, each operation validates that the user is the owner of the resource. Entities were modeled with TypeORM, establishing relationships between users, sites, and contacts. Error handling uses specific NestJS exceptions: `ConflictException` for duplicates, `NotFoundException` for missing resources, and error logs for S3 failures, indicating when a file is uploaded successfully, when it fails, when it cannot be deleted, and when it is deleted, etc.

## Deployment

This project is configured to deploy on **Render**.

**Steps taken:**
1. Connected the GitHub repository to Render
2. Added environment variables in Render
3. Pushed to the main branch (master)
4. Render automatically builds and deploys

## Resources

- NestJs [NestJs Documentation](https://docs.nestjs.com/)
- AWS SDK [AWS SDK JAVASCRIPT](https://docs.aws.amazon.com/sdk-for-javascript/)
- Supabase [Supabase Documentation](https://supabase.com/docs/guides/database/overview)
- Vercel [Vercel Documentation](https://vercel.com/docs)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
