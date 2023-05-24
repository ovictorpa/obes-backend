const AddressesService = require('../services/AddressesService');

class AddressesController {
  async addAddress(req, res) {

    const { id } = req.user;
    const addressesService = new AddressesService();
    const address = await addressesService.createAddress({ ...req.body, user_id: id });

    return res.status(201).json(address);
  }
}

module.exports = new AddressesController();
