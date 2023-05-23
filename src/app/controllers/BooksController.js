const Book = require('../models/Book');
const { Op } = require('sequelize');
const BooksService = require('../services/BooksService');

class BooksController {

  async getAllBooks(req, res) {
    // const booksService = new BooksService();

    // res.json(await booksService.createBook(req.body));
    try {
      //const title = req.query.title || '';
      const { limit, offset, price_limit, title, order_by } = req.query;

      const whereOptions = {};

      if(price_limit) {
        whereOptions.price = { [Op.lte]: price_limit };
      }

      if(title) {
        whereOptions.title = { [Op.iLike]: `%${title}%`};
      }

      const order = [];
      if(order_by) {
        const [field, orderDirection] = order_by.split(',');
        order.push([field, orderDirection]);
      }

      const books = await Book.findAll({
        where: whereOptions,
        limit,
        offset,
        order
      });

      res.json(books);
    } catch (e) {
      return res.status(400).json({
        e
      });
    }
  }

  async getBookById(req, res) {
    try {
      const { id } = req.params;

      const book = await Book.findByPk(parseInt(id));

      if (book === null) {
        return res.status(400).json({ message: 'Book not found' });
      }
      return res.status(200).json(book);
    } catch (e) {
      return res.status(400).json({
        erors: e.errors.map((err) => err.message),
      });
    }
  }

  async addBook(req, res) {
    const filename = req.file?.filename;
    const booksService = new BooksService();
    const book = await booksService.createBook({ ...req.body, filename });

    return res.status(201).json(book);
  }

  async updateBook(req, res) {
    try {
      const { id } = req.params;

      const book = await Book.findByPk(parseInt(id));

      if (!book) {
        return res.status(400).json({
          errors: ['Book not found'],
        });
      }

      await book.update(req.body);

      return res.json({ message: 'Informations Updated Successfully', book });
    } catch (e) {
      return res.status(400).json({
        erors: e.errors.map((err) => err.message),
      });
    }
  }

  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(parseInt(id));

      if (!book) {
        return res.status(400).json({
          errors: ['Book not found'],
        });
      }

      await book.destroy();

      return res.json({ message: 'Book Deleted Successfully!' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

module.exports = new BooksController();
