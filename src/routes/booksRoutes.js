const { Router } = require("express");
const multer = require('multer')
const BooksController = require('../app/controllers/BooksController')
const login = require('../middleware/login');
const multerConfig  = require("../app/config/multerConfig");

const bookRouter = Router();

const upload = multer(multerConfig)

bookRouter.get('/books', BooksController.getAllBooks);
bookRouter.get('/books/:id', BooksController.getBookById);
bookRouter.post('/books', login, upload.single('image'), BooksController.addBook);
bookRouter.put('/books/:id', login, BooksController.updateBook);
bookRouter.delete('/books/:id', login, BooksController.deleteBook);

module.exports = bookRouter;