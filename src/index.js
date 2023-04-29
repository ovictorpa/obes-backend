const express = require("express");
const app = express();
const door = 3000;
const bookRoutes = require('../src/routes/booksRoutes')

app.use(express.json());
app.use('/api', bookRoutes)

if (process.env.NODE_ENV !== 'test') {
    app.listen(door, () => console.log('📚 Obes API started at http://localhost:3000'));
  }

module.exports = app;