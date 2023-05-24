const Address = require('../models/Address');
const BadRequest = require('../services/errors/BadRequest');

class AddressesRepository {
  async create({
    cep,
    state,
    city,
    area,
    address_name,
    number,
    complement,
    user_id }) {
    try {
      const address = await Address.create({
        cep,
        state,
        city,
        area,
        address_name,
        number,
        complement,
        user_id });

      return address;
    } catch(e) {
      throw new BadRequest(e.message, e.errors);
    }
  }

  async findById(id) {
    try {
      const address = await Address.findByPk(id);

      return address;
    } catch (e) {
      throw new BadRequest(e.message, e.errors);
    }
  }

  async update(address) {
    try {
      const addressUpdated = await address.save();

      return addressUpdated;
    } catch (e) {
      throw new BadRequest(e.message, e.errors);
    }
  }
}

module.exports = AddressesRepository;
