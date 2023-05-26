const DonationOrdersService = require('../services/DonationOrdersService');

class DonationOrdersController {
  async newOrder(req, res) {
    const { book_id } = req.params;
    const { id: user_id } = req.user;

    const donationOrdersService = new DonationOrdersService();
    const donationOrder = await donationOrdersService.createOrder({ book_id, user_id});

    return res.status(200).json(donationOrder);
  }
}

module.exports = new DonationOrdersController();
