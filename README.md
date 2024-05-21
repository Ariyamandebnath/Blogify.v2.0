# A complete project to build a blogging platform like that of Medium, and FreeCodeCamp


# Project Highlights 
1. Node.js
2. Express.js
3. Typescript
4. Mongoose
5. Redis
6. Mongodb
7. Joi
8. JWT


# About The Project
This project is build kept in mind a production ready environment.It can handle the scale and complexity of a very demanding application with just certain minor tweaks.

It is suitable for Web Apps, Mobile Apps, and other API services.


# Project Instructions
This is a backend appliction for blogging platforms. The main focus her is to create a maintainable and highly testable architecture.
<br>
Following are the features of this project:
* **This backend is written in Typescript**: The type safety at build time and having intellisense for it in the IDE like vscode is unparalleled to productivity. I have found production bug reduced to a significant amount since most of the code vulnerabilities are identified during the build phase itself.

* **Separation of concern principle**: Each component has been given a particular role. The role of the components is mutually exclusive. This makes the project easy to be unit tested.
* **Feature encapsulation**: The files or components that are related to a particular feature have been grouped unless those components are required in multiple features. This enhances the ability to share code across projects.
* **Centralised Error handling**: I have created a framework where all the errors are handled centrally. This reduces the ambiguity in the development when the project grows larger.
* **Centralised Response handling**: Similar to Error handling we have a response handling framework. This makes it very convenient to apply a common API response pattern.
* **Mongodb is used through Mongoose**: Mongodb fits very well to the node.js application. Being NoSQL, fast, and scalable makes it ideal for modern web applications.
* **Redis Memcache**: I have used the redis server for caching the items which does not change frequently. It will boost the performance of our system.
* **Async execution**: I have used async/await for the promises and made sure to use the non-blocking version of all the functions with few exceptions.

* **A pure backend project**: Creating a backend project brings seperation of concern an helps in scaling the project much easier if the project is build together with a frontend.

## Project Directory Structure
 ```
├── .vscode
│   ├── settings.json
│   ├── tasks.json
│   └── launch.json
├── .templates
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── constants.ts
│   ├── auth
│   │   ├── apikey.ts
│   │   ├── authUtils.ts
│   │   ├── authentication.ts
│   │   ├── authorization.ts
│   │   └── schema.ts
│   ├── core
│   │   ├── ApiError.ts
│   │   ├── ApiResponse.ts
│   │   ├── JWT.ts
│   │   └── utils.ts
│   ├── cache
│   │   ├── index.ts
│   │   ├── keys.ts
│   │   ├── query.ts
│   │   └── repository
│   │       ├── BlogCache.ts
│   │       └── BlogsCache.ts
│   ├── db
│   │   └── db.ts  
│   ├── helpers
│   │   ├── asyncHandler.ts
│   │   ├── permission.ts
│   │   ├── role.ts
│   │   ├── security.ts
│   │   ├── utils.ts
│   │   └── validator.ts
|   ├── models
│   │   ├── ApiKey.model.ts
│   │   ├── Blog.model.ts
│   │   ├── Keystore.model.ts
│   │   ├── Role.model.ts
│   │   └── User.model.ts
|   └── repository
│   │       ├── ApiKey.repo.ts
│   │       ├── Blog.repo.ts
│   │       ├── Keystore.repo.ts
│   │       ├── Role.repo.ts
│   │       └── User.repo.ts
│   ├── routes
│   │   ├── access
│   │   │   ├── credential.ts
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   ├── schema.ts
│   │   │   ├── signup.ts
│   │   │   ├── token.ts
│   │   │   └── utils.ts
│   │   ├── blog
│   │   │   ├── editor.ts
│   │   │   ├── index.ts
│   │   │   ├── schema.ts
│   │   │   └── writer.ts
│   │   ├── blogs
│   │   │   ├── index.ts
│   │   │   └── schema.ts
│   │   ├── index.ts
│   │   └── profile
│   │       ├── schema.ts
│   │       └── user.ts
│   └── types
│       └── app-request.d.ts
├── keys
│   ├── private.pem
│   └── public.pem
├── .env
├── .gitignore
├── .eslintrc
├── .eslintignore
├── .prettierrc
├── .prettierignore
├── package-lock.json
├── package.json
└── tsconfig.json
 ```


 ## Directory Traversal for Signup API call
 `/src → index.ts → app.ts → /routes/index.ts → /auth/apikey.ts → schema.ts → /helpers/validator.ts → asyncHandler.ts → /routes/access/signup.ts → schema.ts → /helpers/validator.ts → asyncHandler.ts → /repositorys/User.repo.ts → /models/User.model.ts → /core/ApiResponses.ts`