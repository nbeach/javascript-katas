let CircularObject = require('../src/CircularObject');

class Coin extends CircularObject {

  constructor(diameter, weight, value) {
    super(diameter, weight);
    this._value = value;
  }

  getValue() {
    return this._value;
  }

  equals(coin) {
    return super.equals(coin) && this._value === coin.getValue();
  }

}

module.exports = Coin;