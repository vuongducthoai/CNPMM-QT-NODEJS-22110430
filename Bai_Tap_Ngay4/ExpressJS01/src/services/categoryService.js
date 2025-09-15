const Category = require('../models/category');

const createCategoryService = async (name, slug) => {
  try {
    const exist = await Category.findOne({ slug });
    if (exist) return null;
    return await Category.create({ name, slug });
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getCategoriesService = async () => {
  try {
    return await Category.find({});
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  createCategoryService,
  getCategoriesService
};
