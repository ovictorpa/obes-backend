const BooksService = require('../services/BooksService');

class BooksController {

  async getAllBooks(req, res) {
    const booksService = new BooksService();

    const { limit, offset, price_limit, title, order_by, category_id, type_book } = req.query;

    const books = await booksService.getAllBooks(
      limit,
      offset,
      price_limit,
      title,
      order_by,
      category_id,
      type_book
    );

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
    const { id } = req.user;
    const booksService = new BooksService();
    const book = await booksService.createBook({ ...req.body, filename, user_id: id });

    return res.status(201).json(book);
  }

  async updateBook(req, res) {
    const { id } = req.params;
    const { id: user_id } = req.user;

    const booksService = new BooksService();

    const bookUpdated = await booksService.updateBook({ id, user_id, ...req.body });

    return res.status(200).json({
      message: 'Informations Updated Successfully',
      book: bookUpdated
    });
  }

  async deleteBook(req, res) {
    const { id } = req.params;
    const { id: user_id } = req.user;

    const service = new BooksService();

    await service.deleteBookById(id, user_id);

    return res.status(200).json({ message: 'Book Deleted Successfully!' });
  }

  async getBooksFromUser(req, res) {
    const { user_id } = req.params;

    const service = new BooksService();

    const books = await service.findBooksFromUser(user_id);

    return res.status(200).json(books);
  }
}

module.exports = new BooksController();
