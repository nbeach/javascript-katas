var _ = require('lodash');

class VendingMachine {

  constructor(acceptedCoins) {
    this._acceptedCoins = acceptedCoins;
    this._credit = 0;
  }

  getDisplayMessage() {
      return "INSERT COIN";
  }

  insertCoin(circularObject) {
    var coin = _.find(this._acceptedCoins, circularObject.equals.bind(circularObject));

    return !_.isUndefined(coin);
  }

}


module.exports = VendingMachine;