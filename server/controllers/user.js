const User = require('../models/user');
const { errorHandler } = require('../validator/dbErrorHandler');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: errorHandler(err) });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Email does not exits. Please sign up..' })
    }

    // if user is found make sure email and password matched
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'Email or password dont match' });
    }

    // generate the signed token using user id and secret
    const token = jwt.sign({ _id: user._id },  process.env.JWT_SECRET);
    res.cookie('t', token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    res.json({ token, user: { _id, name, email, role } });

  });
};