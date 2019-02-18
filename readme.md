# Library API

This as a RESTful API for a simple library. The goal of this project is to explore the architecture of an Express API and practice some coding.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

In order to run this project, you need to install [Nodejs](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) on your machine.

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

By default, the server will start on http://localhost:3000 and create a mongo database called 'Library'.

## Running the tests

To run the tests

```
$ npm test
```

More tests coming in a future version.

## Deployment

404 - not found (try again later ) ;)

## Built With

* [Expressjs](https://expressjs.com/) - The web framework used
* [Jest](https://jestjs.io/) - Test Runner

## Authors

* **Márcio Campos** -  [Márcio](https://github.com/marciodscampos)

See also the list of [contributors](https://github.com/marciodscampos/bookstore-api/graphs/contributors) who participated in this project.

## Notes

* When the server starts it will also start service to get some book data from this [website](https://kotlinlang.org/docs/books.html). The data might take some time to be available in the database, and after the initial update, it will be updated every hour.

* Some configuration is expected to come from environment variables, but have a default value in case they are not provided. I added this to simplify the setup, but in a real scenario, it would be very important to set the environment variables correctly.

* The service that updates the books data is configured to run automatically when the server starts, and also every hour after that. This behavior is hardcoded for simplicity, but could easily be changed to a more customizable approach.
