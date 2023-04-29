const getBooks = "SELECT * FROM OBES.BOOKS"
const getBookById = "SELECT * FROM OBES.BOOKS WHERE ID = $1"
const createBook = "INSERT INTO OBES.BOOKS (title, author, publisher, isbn, description, image_url) VALUES ($1, $2, $3, $4, $5, $6)"
const updateBookTitle = "UPDATE OBES.BOOKS SET TITLE = $1 WHERE ID = $2"
const deleteBook = "DELETE FROM OBES.BOOKS WHERE ID = $1"

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBookTitle,
    deleteBook
}
