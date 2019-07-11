const Category = require('../models/category');
const { errorHandler } = require('../validator/dbErrorHandler');

exports.create = (req, res) => {
  const category = new Category(req.body);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.status(200).json({ category });
  });
}