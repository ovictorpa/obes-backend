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

  async findAll(options) {
    try {
      const books = await Book.findAll(options);

      return books;
    } catch(e) {
      throw new BadRequest(e.message);
    }
  }

  async findById(id) {
    try {
      const book = await Book.findByPk(id);

      return book;
    } catch (e) {
      throw new BadRequest(e.message);
    }
  }
}

module.exports = BooksRepository;
