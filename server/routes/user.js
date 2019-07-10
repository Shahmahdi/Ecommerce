const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/user');
const { createUserValidator } = require("../validator/userValidator");

router.post('/signup', createUserValidator, signup);
router.post('/signin', signin);

module.exports = router;