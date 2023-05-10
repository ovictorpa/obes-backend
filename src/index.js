const path = require('path')
const express = require("express");
const helmet = require('helmet')
const cors = require('cors')

const bookRoutes = require('../src/routes/booksRoutes')
const userRoute = require('../src/routes/usersRoutes')
const loginRoutes = require('../src/routes/loginRoutes')
const apiRoute = '/api';

const app = express();
const door = 3000;

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

app.use(cors(corsOptions))
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(apiRoute, bookRoutes)
app.use(apiRoute, userRoute)
app.use(apiRoute, loginRoutes)

if (process.env.NODE_ENV !== 'test') {
    app.listen(door, () => console.log('📚 Obes API started at http://localhost:3000'));
  }

module.exports = app;