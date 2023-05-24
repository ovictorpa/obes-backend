const { Router } = require('express');
const CategoryController = require('../app/controllers/CategoryController');

const categoryRouter = Router();

categoryRouter.get('/categories', CategoryController.getAllCategories);
categoryRouter.get('/categories/:id', CategoryController.getCategoryById);

module.exports = categoryRouter;
