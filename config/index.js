const router = require('express').Router(),
  product = require('./product');

router.use('/product', product);
module.exports = router;
