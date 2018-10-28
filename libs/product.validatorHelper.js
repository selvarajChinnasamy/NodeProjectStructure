const validate = require('validate.js');

isString = (value) => {
  if (!validate.isString(value)) {
    return { message: 'can contain only strings' };
  }
  return false;
};

isNumber = (value) => {
  if (!validate.isNumber(value)) {
    return 'only Number';
  }
  return false;
};

const productValidator = {
  name: {
    presence: {
      allowEmpty: false,
    },
    format: isString,
  },
  price: {
    presence: {
      allowEmpty: false,
    },
    format: isNumber,
  },
  gstPercentage: {
    presence: {
      allowEmpty: false,
    },
    format: isNumber,
  },
};

module.exports = {
  productValidator,
};
