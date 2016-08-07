var _ = require('lodash');

class VendingMachine {

  constructor(acceptedCoins) {
    this._acceptedCoins = acceptedCoins;
    this._credit = 0;
    this._coinReturnContents = [];
  }

  getDisplayMessage() {
      if(this._credit > 0) {
        return this._credit.toFixed(2);
      } else {
        return "INSERT COIN";
      }
  }

  insertCoin(circularObject) {
    let coin = _.find(this._acceptedCoins, circularObject.equals.bind(circularObject));

    if(_.isUndefined(coin)) {
      this._coinReturnContents.push(circularObject);
      return false;
    }

    this._credit += coin.getValue();
    return true;

  }

  emptyCoinReturn() {
    let coinsToReturn = this._coinReturnContents;
    this._coinReturnContents = [];
    return coinsToReturn;
  }

  returnCoins() {
    for(let coin of this._acceptedCoins) {
      let coinsToReturn = Math.floor(this._credit / coin.getValue());
      this._credit -= coin.getValue() * coinsToReturn;

      for(let i = 1; i <= coinsToReturn; i++) {
        this._coinReturnContents.push(coin);
      }

      if(this._credit === 0) {
        break;
      }
    }

  }

}


module.exports = VendingMachine;