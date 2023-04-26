const express = require("express");
const server = express();

server.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    server.listen(8080, () => console.log('🔥 Server started at http://localhost:8080'));
  }

module.exports = server;