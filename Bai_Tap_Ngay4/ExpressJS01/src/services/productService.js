const Product = require('../models/product');

const createProductService = async (data) => {
  try {
    return await Product.create(data);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getProductsService = async (category, page = 1, limit = 100) => {
  try {
    const filter = {};
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .populate('category')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    return { products, total };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const searchProductsService = async (q, category, minPrice, maxPrice) => {
  try {
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (q) {
      filter.name = { $regex: q, $options: 'i' };
    }

    return await Product.find(filter).populate('category');
  } catch (err) {
    console.log(err);
    return null;
  }
};

const searchProducts = async(q, category, minPrice, maxPrice) => {
  try {
      const filter = {};
      if(category) filter.category = category;
      if(minPrice || maxPrice){
        filter.price = {};
        if(minPrice) filter.Product.$gte = Number(minPrice);
        if(maxPrice) filter.price.$lte = Number(maxPrice);
      } 
      if(q){
        filter.name = {$regex: q, $options : 'i'};
      }
      return await Product.find(filter).populate('category');
  } catch(err){
      console.log(err);
      return [];
  }
}

module.exports = {
  createProductService,
  getProductsService,
  searchProductsService,
  searchProducts
};
