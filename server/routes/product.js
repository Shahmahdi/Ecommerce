const express = require('express');
const router = express.Router();
const { create, productById, read, remove, update, list, relatedProductList, listCategories, 
  listBySearch, productPhoto, searchedList } = require('../controllers/product');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);

router.get('/products', list);
router.get('/products/search', searchedList);
router.get('/products/related/:productId', relatedProductList);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', productPhoto);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;