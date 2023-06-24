const CategoriesService = require('../services/CategoriesService');

class CategoryController {
  async getAllCategories(req, res){
    const service = new CategoriesService();

    const categories = await service.getAllCategories();

    return res.status(200).json(categories);
  }

  async getCategoryById(req, res) {
    const { id } = req.params;

    const service = new CategoriesService();

    const category = await service.findById(id);

    return res.status(200).json(category);

  }
}

module.exports = new CategoryController();
