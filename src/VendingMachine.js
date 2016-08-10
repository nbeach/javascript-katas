var _ = require('lodash');

const DISPLAY_MESSAGE = Object.freeze({
  INSERT_COIN: "INSERT COIN",
  EXACT_CHANGE_ONLY: "EXACT CHANGE ONLY",
  SOLD_OUT: "SOLD OUT",
  THANK_YOU: "THANK YOU"
});

class VendingMachine {

  constructor(coinManager, productInventory) {
    this._coinManager = coinManager;
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
      } else if(!this._coinManager.canMakeChange()) {
        return DISPLAY_MESSAGE.EXACT_CHANGE_ONLY;
      } else {
        return DISPLAY_MESSAGE.INSERT_COIN;
      }
  }

  insertCoin(circularObject) {
    let acceptedCoin = this._coinManager.getCoinFor(circularObject);
    if(_.isUndefined(acceptedCoin)) {
      this._coinReturnContents.push(circularObject);
      return false;
    }

    this._credit += acceptedCoin.getValue();
    this._coinManager.addCoin(acceptedCoin);

    return true;
  }

  emptyCoinReturn() {
    let coinsToReturn = this._coinReturnContents;
    this._coinReturnContents = [];
    return coinsToReturn;
  }

  returnCoins() {
    let change = this._coinManager.makeChange(this._credit);
    this._credit = 0;
    this._coinReturnContents = this._coinReturnContents.concat(change);
  }

  getProducts() {
    return _.map(this._productInventory, (productInventory) => productInventory.product);
  }

  dispense(product) {
    let inventoryItem = _.find(this._productInventory, (productInventory) => productInventory.product.equals(product));

    if(inventoryItem.quantity === 0) {
      this._nextDisplayMessage = DISPLAY_MESSAGE.SOLD_OUT;
      return false;
    } else if(inventoryItem.product.getPrice() > this._credit) {
      this._nextDisplayMessage = inventoryItem.product.getPrice().toFixed(2);
      return false;
    }

    this._credit -= inventoryItem.product.getPrice();
    this.returnCoins();
    this._nextDisplayMessage = DISPLAY_MESSAGE.THANK_YOU;
    inventoryItem.quantity--;
    return true;
  }

}


module.exports = VendingMachine;