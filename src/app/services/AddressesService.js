const AddressesRepository = require('../repositories/AddressesRepository');
const NotFound = require('./errors/NotFound');
const Unauthorized = require('./errors/Unauthorized');

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

  async updateAddress(data) {
    const { id } = data;

    const address = await this.addressesRepository.findById(id);

    if(!address) {
      throw new NotFound('Address Not Found');
    }

    if(data.user_id !== address.user_id) {
      throw new Unauthorized('Unauthorized User');
    }

    address.set(data);

    const addressUpdated = await this.addressesRepository.update(address);

    return addressUpdated;
  }

  async deleteAddressById(id, user_id) {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new NotFound('Address Not Found');
    }

    if(user_id !== address.user_id) {
      throw new Unauthorized('Unauthorized User');
    }

    await this.addressesRepository.destroy(address);

    return true;
  }
}

module.exports = AddressesService;
