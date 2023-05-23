const BooksRepository = require('../repositories/BooksRepository');

class BooksService {
  constructor () {
    this.booksRepository = new BooksRepository();
  }
  async getAllBook() {

  }

  async createBook({ title, description, type_book, category, image, price, filename }) {
    const book = await this.booksRepository.create({
      title,
      description,
      type_book,
      category,
      image,
      price,
      filename
    });

    return book;
  }

}

module.exports = BooksService;
