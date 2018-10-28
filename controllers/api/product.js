const express = require('express'),
  router = express.Router(),
  db = require('../../models'),
  productValidator = require('../../middlewares/product.validate');

const product = new db.Product();

router.post('/',productValidator.validateProduct, (req, res, next) => {
  product.insert(req.body).then(data => {
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      id: data._id,
    });
  }).catch(err => next(null, new Error(err)));
});

router.get('/', (req, res, next) => {
  product.get().then(data => {
    res.status(200).json({
      success: true,
      message: 'Products List',
      data: data,
    });
  }).catch(err => next(null, new Error(err)));
});

module.exports = router;