let CircularObject = require('../src/CircularObject');

class Coin extends CircularObject {

  constructor(diameter, weight, value) {
    super(diameter, weight);
    this._value = value;
  }

  getValue() {
    return this._value;
  }

}

module.exports = Coin;