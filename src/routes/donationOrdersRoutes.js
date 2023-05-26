const { Router } = require('express');
const DonationOrdersController = require('../app/controllers/DonationOrdersController');
const login = require('../middleware/login');

const donationOrdersRouter = Router();

donationOrdersRouter.post('/donation-orders/:book_id', login, DonationOrdersController.newOrder);
donationOrdersRouter.get('/donation-orders/', login, DonationOrdersController.getOrdersByUser);

module.exports = donationOrdersRouter;
