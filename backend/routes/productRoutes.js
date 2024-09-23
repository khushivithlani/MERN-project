const express = require('express');
const { getAllProducts , createProduct, updateProducts, deleteProduct, getProductDetail} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.route('/products').get(getAllProducts)

router.route('/product/new').post(isAuthenticatedUser, authorizeRole("admin")  , createProduct)

router.route('/product/:id').put(isAuthenticatedUser, authorizeRole("admin")  , updateProducts)

router.route('/product/:id').delete(isAuthenticatedUser, authorizeRole("admin")  ,deleteProduct).get(getProductDetail)

module.exports = router