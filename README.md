# Alvo Cifras API

REST API for [Alvo Cifras](https://alvocifras.herokuapp.com) website.

![home](https://imgur.com/eYpSCSg.png)

> Swagger available on `/swagger` path

------

## Running the application

### `.env` file

- Create a `.env` file on the project root
  - Use `.env.sample` for reference

### Commands

- Run the application with watch enabled

```
npm run watch-node
```

- Update swagger documentation

```
npm run update-swagger
```

- Deploy app to heroku

```
npm run deploy
```

------

## Technologies used

- NodeJs + Typescript for the API
  - [Express](https://expressjs.com) was used for running the web server
- [Prisma](https://www.prisma.io) + [PlanetScale](https://planetscale.com) for database infra 
