const { createCategoryService, getCategoriesService } = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name, slug } = req.body;
  const result = await createCategoryService(name, slug);
  if (!result) return res.status(400).json({ message: 'Category already exists or error' });
  return res.status(201).json(result);
};

const getCategories = async (req, res) => {
  const result = await getCategoriesService();
  return res.json(result);
};

module.exports = { createCategory, getCategories };
