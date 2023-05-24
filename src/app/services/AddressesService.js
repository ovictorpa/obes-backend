const AddressesRepository = require('../repositories/AddressesRepository');

class AddressesService {
  constructor() {
    this.addressesRepository = new AddressesRepository();
  }

  async createAddress({
    cep,
    state,
    city,
    area,
    address_name,
    number,
    complement,
    user_id }) {
    const address = await this.addressesRepository.create({
      cep,
      state,
      city,
      area,
      address_name,
      number,
      complement,
      user_id });

    return address;
  }
}

module.exports = AddressesService;
