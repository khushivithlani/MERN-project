const express = require('express');
const { getAllProducts , createProduct, updateProducts, deleteProduct, getProductDetail} = require('../controllers/productController');

const router = express.Router();

router.route('/products').get(getAllProducts)

router.route('/product/new').post(createProduct)

router.route('/product/:id').put(updateProducts)

router.route('/product/:id').delete(deleteProduct).get(getProductDetail)

module.exports = router