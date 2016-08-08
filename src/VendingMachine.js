var _ = require('lodash');

class VendingMachine {

  constructor(acceptedCoins, availableCoins, productInventory) {
    this._acceptedCoins = acceptedCoins;
    this._availableCoins = availableCoins;
    this._productInventory = productInventory;
    this._credit = 0;
    this._coinReturnContents = [];
    this._nextDisplayMessage = null;
  }

  getDisplayMessage() {
      if(this._nextDisplayMessage !== null) {
        var message = this._nextDisplayMessage;
        this._nextDisplayMessage = null;
        return message;
      } else if(this._credit > 0) {
        return (this._credit / 100).toFixed(2);
      } else {
        return "INSERT COIN";
      }
  }

  insertCoin(circularObject) {
    let acceptedCoin = _.find(this._acceptedCoins, circularObject.equals.bind(circularObject));
    if(_.isUndefined(acceptedCoin)) {
      this._coinReturnContents.push(circularObject);
      return false;
    }

    this._credit += acceptedCoin.getValue();
    this._addToAvailableCoins(acceptedCoin);

    return true;

  }

  emptyCoinReturn() {
    let coinsToReturn = this._coinReturnContents;
    this._coinReturnContents = [];
    return coinsToReturn;
  }

  returnCoins() {
    //Sort coins in descending order so change is made with the largest denominations first
    this._availableCoins.sort((a, b) => a.coin.getValue() - b.coin.getValue()).reverse();

    for(let availableCoin of this._availableCoins) {
      let coin = availableCoin.coin;
      let quantityAvailable = availableCoin.quantity;

      let quantityToReturn = Math.floor(this._credit / coin.getValue());
      if(quantityToReturn > quantityAvailable) {
        quantityToReturn = quantityAvailable;
      }

      this._addCoinsToReturn(coin, quantityToReturn);
      this._credit -= coin.getValue() * quantityToReturn;
      availableCoin.quantity -= quantityToReturn;

      if(this._credit === 0) {
        break;
      }
    }

  }

  getProducts() {
    return _.map(this._productInventory, (productInventory) => productInventory.product);
  }

  dispense(product) {
    let inventoryItem = _.find(this._productInventory, (productInventory) => productInventory.product.equals(product));

    if(inventoryItem.quantity === 0) {
      this._nextDisplayMessage = "SOLD OUT";
      return false;
    } else if(inventoryItem.product.getPrice() > this._credit) {
      this._nextDisplayMessage = inventoryItem.product.getPrice().toFixed(2);
      return false;
    }

    inventoryItem.quantity--;
    return true;
  }

  _addToAvailableCoins(coin) {
    let availableCoin = _.find(this._availableCoins, (availableCoin) => availableCoin.coin.equals(coin));
    if(_.isUndefined(availableCoin)) {
      this._availableCoins.push({
        coin: coin,
        quantity: 1
      });
    } else {
      availableCoin.quantity++;
    }
  }

  _addCoinsToReturn(coin, quantity) {
    for(let i = 1; i <= quantity; i++) {
      this._coinReturnContents.push(coin);
    }
  }


}


module.exports = VendingMachine;