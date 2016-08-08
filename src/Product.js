class Product {

  constructor(name, price) {
    this._name = name;
    this._price = price;
  }

  getName() {
    return this._name;
  }

  getPrice() {
    this._price;
  }

  equals(product) {
    return this._name === product.getName();
  }
}

module.exports = Product;