const CategoriesService = require('../services/CategoriesService');

class CategoryController {
  async getAllCategories(req, res){
    const categoriesService = new CategoriesService();

    const categories = await categoriesService.getAllCategories();

    return res.status(200).json(categories);
  }

  async getCategoryById(req, res) {
    const { id } = req.params;

    const categoriesService = new CategoriesService();

    const category = await categoriesService.findById(id);

    return res.status(200).json(category);

  }
}

module.exports = new CategoryController();
