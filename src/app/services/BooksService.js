const { Op } = require('sequelize');
const BooksRepository = require('../repositories/BooksRepository');
const NotFound = require('./errors/NotFound');
const Unauthorized = require('./errors/Unauthorized');

class BooksService {
  constructor() {
    this.booksRepository = new BooksRepository();
  }

  async getAllBooks(limit, offset, price_limit, title, order_by) {
    const where = {};
    const order = [];

    if (price_limit) {
      where.price = { [Op.lte]: price_limit };
    }

    if (title) {
      where.title = { [Op.iLike]: `%${title}%` };
    }

    if (order_by) {
      const [field, orderDirection] = order_by.split(',');
      order.push([field, orderDirection]);
    }

    const options = {
      where,
      order,
      offset,
      limit,
      attributes: { exclude: ['created_at', 'updated_at'] }
    };

    const books = await this.booksRepository.findAll(options);

    return books;
  }

  async createBook({ title, description, type_book, category, image, price, filename, user_id }) {
    const book = await this.booksRepository.create({
      title,
      description,
      type_book,
      category,
      image,
      price,
      filename,
      user_id
    });

    return book;
  }

  async findById(id) {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new NotFound('Book Not Found');
    }

    return book;
  }

  async updateBook(data) {
    const { id } = data;

    const book = await this.booksRepository.findById(id);

    if(data.user_id !== book.user_id) {
      throw new Unauthorized('Unauthorized User');
    }

    if (!book) {
      throw new NotFound('Book Not Found');
    }

    book.set(data);

    const bookUpdated = await this.booksRepository.update(book);

    return bookUpdated;
  }

  async deleteBookById(id, user_id) {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new NotFound('Book Not Found');
    }

    if(user_id !== book.user_id) {
      throw new Unauthorized('Unauthorized User');
    }

    await this.booksRepository.destroy(book);

    return true;
  }
}

module.exports = BooksService;
