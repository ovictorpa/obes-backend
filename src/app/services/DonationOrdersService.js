const UserType = require('../models/enums/UserType');
const BooksRepository = require('../repositories/BooksRepository');
const DonationOrdersRepository = require('../repositories/DonationOrdersRepository');
const BadRequest = require('./errors/BadRequest');
const NotFound = require('./errors/NotFound');
const UsersService = require('./UsersService');

class DonationOrdersService {
  constructor() {
    this.donationOrdersRepository = new DonationOrdersRepository();
    this.booksRepository = new BooksRepository();
  }

  async createOrder({ book_id, user_id}) {
    const usersService = new UsersService();

    const user = await usersService.findById(user_id);

    if(user.user_type !== UserType.Institutional) {
      throw new BadRequest('User Is Not Institutional Type');
    }

    const book = await this.booksRepository.findById(book_id);

    if (!book) {
      throw new NotFound('Book Not Found');
    }

    if(book.user_id === user_id) {
      throw new BadRequest('Book Cannot Be Requested by the Same User Who Registered');
    }

    if(!book.available) {
      throw new BadRequest('Book is unavailable');
    }

    const donationOrder = await this.donationOrdersRepository.create({
      book_id,
      user_id
    });

    book.set({ available: false});

    await this.booksRepository.update(book);

    return donationOrder;
  }

  async getDonationOrdersByUserId(user_id) {
    const donationOrders = await this.donationOrdersRepository.findByUserId(user_id);

    return donationOrders;
  }
}

module.exports =  DonationOrdersService;
