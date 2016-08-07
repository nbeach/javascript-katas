var _ = require('lodash');

class VendingMachine {

  constructor(acceptedCoins) {
    this._acceptedCoins = acceptedCoins;
    this._credit = 0;
  }

  getDisplayMessage() {
      if(this._credit > 0) {
        return this._credit.toFixed(2);
      } else {
        return "INSERT COIN";
      }
  }

  insertCoin(circularObject) {
    var coin = _.find(this._acceptedCoins, circularObject.equals.bind(circularObject));

    if(_.isUndefined(coin)) {
      return false;
    }


    this._credit += coin.getValue();
    return true;

  }

}


module.exports = VendingMachine;