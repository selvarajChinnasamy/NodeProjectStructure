const validate = require('validate.js'),
  validator = require('../libs/product.validatorHelper');

module.exports = {
  validateProduct(req, res, next) {
    const request = Object.assign({}, req.body);
    const invalidResult = validate(request, validator.productValidator);
    if (invalidResult) {
      res.status(422).json({ success: false, message: invalidResult });
    } else {
      next();
    }
  },
};
