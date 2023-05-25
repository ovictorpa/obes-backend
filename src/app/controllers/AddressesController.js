const AddressesService = require('../services/AddressesService');

class AddressesController {
  async addAddress(req, res) {

    const { id } = req.user;
    const addressesService = new AddressesService();
    const address = await addressesService.createAddress({ ...req.body, user_id: id });

    return res.status(201).json(address);
  }

  async updateAddress(req, res) {
    const { id } = req.params;
    const { id: user_id } = req.user;

    const addressesService = new AddressesService();

    const addressUpdated = await addressesService.updateAddress({
      id,
      ...req.body,
      user_id
    });

    return res.status(200).json({
      message: 'Informations Updated Successfully',
      address: addressUpdated
    });
  }

  async deleteAddress(req, res) {
    const { id } = req.params;
    const { id: user_id } = req.user;

    const service = new AddressesService();

    await service.deleteAddressById(id, user_id);

    return res.status(200).json({ message: 'Address Deleted Successfully!' });
  }
}

module.exports = new AddressesController();
