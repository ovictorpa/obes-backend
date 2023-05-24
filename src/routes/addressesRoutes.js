const { Router } = require('express');
const AddressesController = require('../app/controllers/AddressesController');
const login = require('../middleware/login');
const addressesRouter = Router();

addressesRouter.post('/addresses', login, AddressesController.addAddress);
addressesRouter.put('/address/:id', login, AddressesController.updateAddress);

module.exports = addressesRouter;
