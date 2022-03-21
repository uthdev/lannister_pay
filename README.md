# Lannister Pay

A Payment processing service for a fictional Payment Processor (LannisterPay). This service is to be used for determining the processing fee to charge per transaction.

---

## Features

- Add Fee configuration specs
- Compute transaction fee

---

---

## Backend

The api is hosted on [Heroku](https://uth-lannister-pay.herokuapp.com/)

---

## Documentation

The api is documented with [Postman](https://documenter.getpostman.com/view/6265858/UVkjwyJB)

---

## Technologies Used

- Node.js
- Express.js
- ESLint

---

## Testing Tools

- [Postman](https://www.getpostman.com)

---

## API Information

The API is hosted on [https://uthdev-premier.herokuapp.com/](https://uth-lannister-pay.herokuapp.com/)

METHOD |  RESOURCE                 |     DESCRIPTION                | ENDPOINTS
-------|---------------------------|--------------------------------|-----------
GET    | ----                      | Home page                      |`/`
POST   | fees configuration spec   | Add fee configuration specs    |`/fees`
POST   | transaction fee           | Compute transaction fee        |`/compute-transaction-fee`

---

#### Clone

- Clone this repo to your local machine using `https://github.com/uthdev/lannister_pay`

#### Setup

- Installing the project's dependencies:

> run the command below

```shell
npm install
```

> Then create a .env file in the root directory of the project

```shell
touch .env
```

> Then copy the content of the .env.example file in the root directory into .env file and fill in th required parameters

> To start the server, run the command below

```shell
npm start
```

---

## Author

Adeleke Gbolahan Uthman
