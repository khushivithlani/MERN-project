const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetail, updateUserPassword, updateUserProfile, getAllUser, getSingleUser, updateUserRole, deleteUserProfile } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserDetail)
router.route('/password/update').put(isAuthenticatedUser, updateUserPassword)
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile)
router.route('/admin/users').get(isAuthenticatedUser, authorizeRole("admin"), getAllUser);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
.put(isAuthenticatedUser, authorizeRole("admin"), updateUserRole).delete(isAuthenticatedUser, authorizeRole("admin"), deleteUserProfile);

module.exports = router