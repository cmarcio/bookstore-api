# Library API

This as a RESTful API for a simple library. The goal of this project is to explore the architecture of a Express API and practice some coding.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

In order to run this project you need to install [Nodejs](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) on your machine.

### Folder structure

.


### Installing

In order to run the project do the following:

Install the project dependencies

```
$ cd <project-folder>
$ npm install
```

Then you can start the server by running

```
$ npm start
```

By default the server will start on http://localhost:3000 and create a mongo database called 'Library'.

## Running the tests

To run the tests

```
$ npm test
```

### Tests folder structure

All the tests are inside the folder tests with the following structure:

.
+-- tests
    +-- controllers
        +--BookController.spec.ts
    +-- services
        +--BookService.spec.ts
    

More tests coming in future version.

## Deployment

404 - not found (try again later ) ;)

## Built With

* [Expressjs](https://expressjs.com/) - The web framework used
* [Jest](https://jestjs.io/) - Test Runner

## Authors

* **Márcio Campos** - *Initial work* - [PurpleBooth](https://github.com/marciodscampos)

See also the list of [contributors](https://github.com/marciodscampos/bookstore-api/graphs/contributors) who participated in this project.


## Notes

* When the server starts it will also starts a service to get some book data from this [website](https://kotlinlang.org/docs/books.html). The data might take some time to be available in the database, and after that will be update every hour.

* Some configuration is expected to come from environment variables, but have a default value in case they are not provided. I added this to simplify the setup, but in a real cenario it would be very importante to set the environment variables correctely.
