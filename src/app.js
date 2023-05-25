require('express-async-errors');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const bookRoutes = require('./routes/booksRoutes');
const userRoute = require('./routes/usersRoutes');
const loginRoutes = require('./routes/loginRoutes');
const categoryRouter = require('./routes/categoriesRoutes');
const addressRoutes = require('./routes/addressesRoutes');
const apiRoute = '/api';

const whitelist = [
  'http://localhost:8080',
  'http://localhost:3000'
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

// eslint-disable-next-line no-unused-vars
const errorHandling = (err, request, response, next) => {
  if (err instanceof Error) {
    return response.status(err.statusCode).json({
      message: err.message,
      errors: err.errors
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
};


class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();

    this.app.use(errorHandling);
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use(apiRoute, bookRoutes);
    this.app.use(apiRoute, userRoute);
    this.app.use(apiRoute, loginRoutes);
    this.app.use(apiRoute, categoryRouter);
    this.app.use(apiRoute, addressRoutes);
  }
}

module.exports = new App().app;
