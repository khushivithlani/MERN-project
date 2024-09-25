const express = require('express');
const { getAllProducts , createProduct, updateProducts, deleteProduct, getProductDetail, createProductReview, getProductReviews, deleteReviews} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.route('/products').get(getAllProducts)

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRole("admin")  , createProduct)

router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRole("admin")  , updateProducts)

router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRole("admin")  ,deleteProduct)

router.route('/product/:id').get(getProductDetail)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReviews)

module.exports = router;