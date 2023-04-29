const pool = require('../../database')
const query = require('../query/books-query')

class BooksController {

    getAllBooks(req, res) {
        pool.query(query.getBooks, (error, results) => {
            if (error) throw error
            res.status(200).json(results.rows);
        })
    }
    getBookById(req, res) {
        const id = parseInt(req.params.id);
        pool.query(query.getBookById, [id], (error, results) => {
            const invalidId = !results.rows.length;
            if(invalidId) {
                res.send("Invalid Id")
            }
        })
        pool.query(query.getBookById, [id], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    }
    addBook(req, res) {
        const {
            title, author, publisher, isbn, description, image_url
        } = req.body;

        pool.query(query.createBook, 
            [title, author, publisher, isbn, description, image_url], 
            (error, results) => {
                if (error) throw error;
                res.status(201).send("Book Created Successfully!");          
        })
    }
    updateBook(req, res) {
        const id = parseInt(req.params.id);
        const {title} = req.body;
        pool.query(query.getBookById, [id], (error, results) => {
            const invalidId = !results.rows.length;
            if(invalidId) {
                res.send("Invalid Id")
            }
        })

        pool.query(query.updateBook, [title, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Title Updated Successfully")
        })

    }
    deleteBook(req, res) {
        const id = parseInt(req.params.id);
        pool.query(query.deleteBook, [id], (error, results) => {
            const invalidId = !results.rows.length;
            if(invalidId) {
                res.send("Invalid Id")
            }
        })
        pool.query(query.deleteBook, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Book Deleted Successfully!");
        })
    }
}

module.exports = new BooksController();