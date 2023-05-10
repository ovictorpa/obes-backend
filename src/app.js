const path = require('path')
const express = require("express");
const helmet = require('helmet')
const cors = require('cors')

const bookRoutes = require('./routes/booksRoutes')
const userRoute = require('./routes/usersRoutes')
const loginRoutes = require('./routes/loginRoutes')
const apiRoute = '/api';

const whitelist = [
  'http://localhost:8080',
];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};


class App {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(cors(corsOptions))
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use(apiRoute, bookRoutes)
    this.app.use(apiRoute, userRoute)
    this.app.use(apiRoute, loginRoutes)

  }
}

module.exports = new App().app;