const { Router } = require("express");
const BooksController = require('../app/controllers/BooksController')
const login = require('../middleware/login')

const bookRouter = Router();

bookRouter.get('/books', BooksController.getAllBooks);
bookRouter.get('/books/:id', BooksController.getBookById);
bookRouter.post('/books', login, BooksController.addBook);
bookRouter.put('/books/:id', login, BooksController.updateBook);
bookRouter.delete('/books/:id', login, BooksController.deleteBook);

module.exports = bookRouter;