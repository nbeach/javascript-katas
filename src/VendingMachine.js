var _ = require('lodash');

class VendingMachine {

  constructor(acceptedCoins, availableCoins) {
    this._acceptedCoins = acceptedCoins;
    this._availableCoins = availableCoins;
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
    //Sort coins in descending order so change is made with the largest denominations first
    let availableCoins = _.sortBy(this._availableCoins, (availableCoin) => availableCoin.coin.getValue()).reverse();

    for(let availableCoin of availableCoins) {
      let coin = availableCoin.coin;
      let quantityAvailable = availableCoin.quantity;

      let quantityToReturn = Math.floor(this._credit / coin.getValue());
      if(quantityToReturn > quantityAvailable) {
        quantityToReturn = quantityAvailable;
      }


      this._addCoinsToReturn(coin, quantityToReturn);
      this._credit -= coin.getValue() * quantityToReturn;


      if(this._credit === 0) {
        break;
      }
    }

  }

  _addCoinsToReturn(coin, quantity) {
    for(let i = 1; i <= quantity; i++) {
      this._coinReturnContents.push(coin);
    }
  }


}


module.exports = VendingMachine;