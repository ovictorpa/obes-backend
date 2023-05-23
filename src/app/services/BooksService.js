const { Op } = require('sequelize');
const BooksRepository = require('../repositories/BooksRepository');

class BooksService {
  constructor () {
    this.booksRepository = new BooksRepository();
  }

  async getAllBooks( limit, offset, price_limit, title, order_by ) {
    const where = {};
    const order = [];

    if(price_limit) {
      where.price = { [Op.lte]: price_limit };
    }

    if(title) {
      where.title = { [Op.iLike]: `%${title}%`};
    }

    if(order_by) {
      const [field, orderDirection] = order_by.split(',');
      order.push([field, orderDirection]);
    }

    const options = {
      where,
      order,
      offset,
      limit,
      attributes: { exclude: ['created_at', 'updated_at']}
    };

    const books = await this.booksRepository.findAll(options);

    return books;
  }

  async createBook({ title, description, type_book, category, image, price, filename }) {
    const book = await this.booksRepository.create({
      title,
      description,
      type_book,
      category,
      image,
      price,
      filename
    });

    return book;
  }

}

module.exports = BooksService;
