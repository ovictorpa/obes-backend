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
        const { title, description, image_url,  preco} = req.body;

        if(preco == null){
            pool.query(query.createBook, [title, description, image_url], (error, results) => {
                if (error) throw error;
                res.status(201).send("Book Created Successfully!");          
            })
        }
        else {
            pool.query(query.createBookForSale, [title, description, image_url, preco], (error, results) =>{
                if (error) throw error;
                res.status(201).send("Book Created Successfully!");
            })
        }
    }
    updateBook(req, res) {
        const id = parseInt(req.params.id);
        const {title, description, image_url, preco} = req.body;
        pool.query(query.getBookById, [id], (error, results) => {
            const invalidId = !results.rows.length;
            if(invalidId) {
                res.send("Invalid Id")
            }
        })
        if(title){
            pool.query(query.updateBookTitle, [title, id], (error, results) => {
            })
        }
        if(description){
            pool.query(query.updateBookDescription, [description, id], (error, results) => {
                if(error) throw error;
            })
        }
        if(image_url){
            pool.query(query.updateBookImage, [image_url, id], (error, results) => {
                if(error) throw error;
            })
        }
        if(preco){
            pool.query(query.updateBookPrice, [preco, id], (error, results) => {
                if(error) throw error;
            })
        }
        if(title || description || image_url || preco)
            res.status(200).send("Informations Updated Successfully")
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