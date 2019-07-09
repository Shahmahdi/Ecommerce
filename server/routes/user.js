const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/user');
const { createUserValidator } = require("../validator/userValidator");

router.post('/signup', createUserValidator, signup);

module.exports = router;