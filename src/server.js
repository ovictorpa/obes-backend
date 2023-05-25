const app = require('./app');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger.json')

const port = 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`📚 Obes API started at http://localhost:${port}/api-docs`));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
