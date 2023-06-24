const CategoriesRepository = require('../repositories/CategoriesRepository');
const NotFound = require('./errors/NotFound');

class CategoriesService {
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async getAllCategories(){
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }

  async findById(id) {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new NotFound('Category Not Found');
    }

    return category;
  }
}

module.exports = CategoriesService;
