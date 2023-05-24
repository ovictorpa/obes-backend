const Book = require('../models/Book');
const BooksService = require('../services/BooksService');

class BooksController {

  async getAllBooks(req, res) {
    const booksService = new BooksService();

    const { limit, offset, price_limit, title, order_by } = req.query;

    const books = await booksService.getAllBooks(limit, offset, price_limit, title, order_by);

    return res.status(200).json(books);
  }

  async getBookById(req, res) {
    const { id } = req.params;

    const booksService = new BooksService();

    const book = await booksService.findById(id);

    return res.status(200).json(book);
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
