const { Router } = require("express");
const BooksController = require('../app/controllers/BooksController')

const bookRouter = Router();

bookRouter.get('/books', BooksController.getAllBooks);
bookRouter.get('/books/:id', BooksController.getBookById);
bookRouter.post('/books', BooksController.addBook);
bookRouter.put('/books/:id', BooksController.updateBook);
bookRouter.delete('/books/:id', BooksController.deleteBook);

module.exports = bookRouter;