const getBooks = "SELECT * FROM OBES.BOOKS"
const getBookById = "SELECT * FROM OBES.BOOKS WHERE ID = $1"
const createBook = "INSERT INTO OBES.BOOKS (title, description, image_url) VALUES ($1, $2, $3)"
const createBookForSale = "INSERT INTO OBES.BOOKS (title, description, image_url, preco) VALUES ($1, $2, $3, $4)"
const updateBookTitle = "UPDATE OBES.BOOKS SET TITLE = $1 WHERE ID = $2"
const updateBookDescription = "UPDATE OBES.BOOKS SET DESCRIPTION = $1 WHERE ID = $2"
const updateBookImage = "UPDATE OBES.BOOKS SET IMAGE_URL = $1 WHERE ID = $2"
const updateBookPrice = "UPDATE OBES.BOOKS SET PRECO = $1 WHERE ID = $2"
const deleteBook = "DELETE FROM OBES.BOOKS WHERE ID = $1"

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBookTitle,
    deleteBook,
    createBookForSale,
    updateBookDescription,
    updateBookImage,
    updateBookPrice
}
