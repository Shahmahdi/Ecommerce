const Product = require('../models/product');
const { errorHandler } = require('../validator/dbErrorHandler');
const formidable = require('formidable');
const fs = require('fs');
const { extend } = require('lodash');

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({ error: 'Product not found' });
    }
    req.product = product;
    next();
  });
}

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
}

exports.create = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Photo could not be uploaded.' });
    }
    let product = new Product(fields);

    const { name, description, price, quantity, shipping, category } = fields;

    if (!name || !description || !price || !quantity || !shipping || !category) {
      return res.status(400).json({ error: 'All fields required' });
    }

    if (files.photo) {
      // console.log('product.photo: ', files.photo);
      // 1kb = 1000
      // 1mb = 1000000
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: 'photo should be less than 1 Mb' })
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(product);
    })
  })
}

exports.remove = (req, res) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({
      message: 'Product deleted successfully.'
    });
  });
}

exports.update = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Photo could not be uploaded.' });
    }
    let product = req.product;
    product = extend(product, fields);

    const { name, description, price, quantity, shipping, category } = fields;

    if (!name || !description || !price || !quantity || !shipping || !category) {
      return res.status(400).json({ error: 'All fields required' });
    }

    if (files.photo) {
      // console.log('product.photo: ', files.photo);
      // 1kb = 1000
      // 1mb = 1000000
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: 'photo should be less than 1 Mb' })
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(product);
    })
  })
}