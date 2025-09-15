const { createProductService, getProductsService, searchProductsService } = require('../services/productService');
const {searchProductsElastic} = require('../services/elasticSearchService');
const Category = require('../models/category')

const createProduct = async (req, res) => {
  const result = await createProductService(req.body);
  if (!result) return res.status(400).json({ message: 'Cannot create product' });
  return res.status(201).json(result);
};

const getProducts = async (req, res) => {
  const { category, page, limit } = req.query;
  const result = await getProductsService(category, page, limit);
  return res.json(result.products);
};

const searchProducts = async (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  const result = await searchProductsService(q, category, minPrice, maxPrice);
  return res.json(result);
};

const searchProductFuzzys = async (req, res) => {
  try {
    const {q, categoryName, minPrice, maxPrice, minDiscount, minViews} = req.query;

    let categoryId = null;
    if(categoryName) {
      const category = await Category.findOne({name: categoryName});
      if(category) {
        categoryId = category._id.toString();
      }
    }

     const products  = await searchProductsElastic(
       q,
       categoryId,
       minPrice,
       maxPrice,
       minDiscount,
       minViews 
     );

     if(products) {
      return res.status(200).json(products || []);
     } else {
      return res.status(500).json({success: false, message: 'Failed to perform search'});
     }
  } catch(err) {
    console.error(err);
    return res.status(500).json({success: false, message: 'Internal Server Error'});
  }
}

module.exports = { createProduct, getProducts, searchProducts, searchProductFuzzys };
