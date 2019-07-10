const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../controllers/auth');
const { createUserValidator } = require("../validator/userValidator");

router.post('/signup', createUserValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;