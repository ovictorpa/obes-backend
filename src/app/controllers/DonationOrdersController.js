const DonationOrder = require('../models/DonationOrder');
const BooksRepository = require('../repositories/BooksRepository');
const BadRequest = require('../services/errors/BadRequest');
const NotFound = require('../services/errors/NotFound');

class DonationOrdersController {
  async newOrder(req, res) {
    const { book_id } = req.params;
    const { id: user_id } = req.user;
    const bookRepository = new BooksRepository();
    const book = await  bookRepository.findById(book_id);

    if (!book) {
      throw new NotFound('Book Not Found');
    }

    if(!book.available) {
      throw new BadRequest('Book is unavailable');
    }

    const donation = await DonationOrder.create({
      date: new Date(),
      book_id,
      user_id
    });

    book.set({ available: false});

    await bookRepository.update(book);

    return res.status(200).json(donation);
  }
}

module.exports = new DonationOrdersController();
