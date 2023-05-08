const path = require('path')
const express = require("express");
const app = express();
const door = 3000;

const bookRoutes = require('../src/routes/booksRoutes')
const userRoute = require('../src/routes/usersRoutes')
const loginRoutes = require('../src/routes/loginRoutes')
const apiRoute = '/api';

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