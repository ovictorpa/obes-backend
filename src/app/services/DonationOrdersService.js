const BooksRepository = require('../repositories/BooksRepository');
const DonationOrdersRepository = require('../repositories/DonationOrdersRepository');
const BadRequest = require('./errors/BadRequest');
const NotFound = require('./errors/NotFound');

class DonationOrdersService {
  constructor() {
    this.donationOrdersRepository = new DonationOrdersRepository();
    this.booksRepository = new BooksRepository();
  }

  async createOrder({ book_id, user_id}) {
    const book = await this.booksRepository.findById(book_id);

    if (!book) {
      throw new NotFound('Book Not Found');
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
}

module.exports =  DonationOrdersService;
