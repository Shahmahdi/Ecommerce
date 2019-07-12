const Category = require('../models/category');
const { errorHandler } = require('../validator/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: 'Category does not exists.' });
    }
    req.category = category;
    next();
  })
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.create = (req, res) => {
  const category = new Category(req.body);

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.status(200).json({ category });
  });
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json(category);
  })
};

exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json({ message: 'Category deleted successfully.' });
  });
};

exports.list = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json(categories);
  });
};