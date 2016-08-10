class Product {

  constructor(name, price) {
    this._name = name;
    this._price = price;
  }

  getName() {
    return this._name;
  }

  getPrice() {
    return this._price;
  }

  equals(product) {
    return this._name === product.getName() && this._price === product.getPrice();
  }
}

module.exports = Product;