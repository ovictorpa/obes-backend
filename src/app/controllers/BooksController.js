const pool = require('../../database');
const Book = require('../models/Book');
const query = require('../query/books-query')

class BooksController {

    async getAllBooks(req, res) {
        try {
            const books  = await Book.findAll();
            res.json(books);
        } catch(e) {
            return res.status(400).json({
                erors: e.errors.map((err) => err.message),
            });
        }
    }
    
    async getBookById(req, res) {
        try {
            const { id } = req.params

            const book = await Book.findByPk(parseInt(id))

            if(book === null) {
                return res.status(400).json({ message: `Book not found`})
            }
            return res.status(200).json(book)
        } catch(e) {
            return res.status(400).json({
                erors: e.errors.map((err) => err.message),
            });
        }
    }

    async addBook(req, res) {
        try {
            const filename = req.file?.filename;

            const book = await Book.create({...req.body, filename});
    
            return res.send(book)
        } catch(e) {
            return res.status(400).json({
                erors: e.errors.map((err) => err.message),
            });
        }
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