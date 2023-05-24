const Book = require('../models/Book');
const BadRequest = require('../services/errors/BadRequest');

class BooksRepository {

  async create({ title, description, type_book, category_id, image, price, filename, user_id }) {
    try {
      const book = await Book.create({
        title,
        description,
        type_book,
        category_id,
        image,
        price,
        filename,
        user_id
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
    } catch (e) {
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

  async update(book) {
    try {
      const bookUpdated = await book.save();

      return bookUpdated;
    } catch (e) {
      throw new BadRequest(e.message);
    }
  }

  async destroy(book) {
    try {
      await book.destroy();

      return true;
    } catch (e) {
      throw new BadRequest(e.message);
    }
  }
}

module.exports = BooksRepository;
