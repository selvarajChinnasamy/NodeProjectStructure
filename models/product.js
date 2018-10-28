class Product {
  constructor() {
    this.result = null;
  }

  static get tableName() {
    return 'products';
  }

  insert(value) {
    return new Promise(((resolve, reject) => {
      global.connection.insertQuery(Product.tableName, value).then(res => {
        return resolve(res);
      }).catch(err => {
        return reject(err);
      })
    }));
  }
  get() {
    return new Promise(((resolve, reject) => {
      global.connection.getQuery(Product.tableName).then(res => {
        return resolve(res);
      }).catch(err => {
        return reject(err);
      })
    }));
  }
}

module.exports = Product;
