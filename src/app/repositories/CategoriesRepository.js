const Category = require('../models/Category');
const BadRequest = require('../services/errors/BadRequest');

class CategoriesRepository {
  async findAll() {
    try {
      const categories = await Category.findAll();

      return categories;
    } catch (e) {
      throw new BadRequest(e.message, e.errors);
    }
  }

  async findById(id) {
    try {
      const category = await Category.findByPk(id);

      return category;
    } catch (e) {
      throw new BadRequest(e.message, e.errors);
    }
  }
}

module.exports = CategoriesRepository;
