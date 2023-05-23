const Book = require('../models/Book');
const BadRequest = require('../services/errors/BadRequest');

class BooksRepository {

  async create({ title, description, type_book, category, image, price, filename }) {
    try {
      const book = await Book.create({
        title,
        description,
        type_book,
        category,
        image,
        price,
        filename
      });

      return book;
    } catch (e) {
      throw new BadRequest(e.message);
    }
  }
}

module.exports = BooksRepository;
