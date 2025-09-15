const express = require('express');
const { createProduct, getProducts, searchProducts, searchProductFuzzys } = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts); 
router.get('/search', searchProducts); 
router.get('/search/elastic', searchProductFuzzys);

module.exports = router;