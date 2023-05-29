const { Op } = require('sequelize');
const BooksRepository = require('../repositories/BooksRepository');
const NotFound = require('./errors/NotFound');
const Unauthorized = require('./errors/Unauthorized');
const Category = require('../models/Category');
const TypeBook = require('../models/enums/TypeBook');
const BadRequest = require('./errors/BadRequest');

class BooksService {
  constructor() {
    this.booksRepository = new BooksRepository();
  }

  async getAllBooks(limit, offset, price_limit, title, order_by, category_id, type_book) {
    const where = {};
    const order = [];

    if (price_limit) {
      where.price = { [Op.lte]: price_limit };
    }

    if (title) {
      where.title = { [Op.iLike]: `%${title}%` };
    }

    if(category_id) {
      where.category_id = { [Op.eq]: category_id};
    }

    if(type_book === TypeBook.Donation || type_book === TypeBook.Sale) {
      where.type_book = { [Op.eq]: type_book};
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
      include: [
        { model: Category, attributes: ['name']}
      ]
    };

    const books = await this.booksRepository.findAll(options);

    return books;
  }

  async createBook({ title, description, type_book, category_id, image, price, filename, user_id }) {
    if (type_book !== TypeBook.Donation && type_book !== TypeBook.Sale) {
      throw new BadRequest('Invalid Book type');
    }

    const book = await this.booksRepository.create({
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

    const book = await this.findById(id);

    if(data.user_id !== book.user_id) {
      throw new Unauthorized('Unauthorized User');
    }

    book.set(data);

    const bookUpdated = await this.booksRepository.update(book);

    return bookUpdated;
  }

  async deleteBookById(id, user_id) {
    const book = await this.findById(id);

    if(user_id !== book.user_id) {
      throw new Unauthorized('Unauthorized User');
    }

    await this.booksRepository.destroy(book);

    return true;
  }
}

module.exports = BooksService;
