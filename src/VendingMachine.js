var _ = require('lodash');

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
        return "EXACT CHANGE ONLY";
      } else {
        return "INSERT COIN";
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
      this._nextDisplayMessage = "SOLD OUT";
      return false;
    } else if(inventoryItem.product.getPrice() > this._credit) {
      this._nextDisplayMessage = inventoryItem.product.getPrice().toFixed(2);
      return false;
    }

    this._credit -= inventoryItem.product.getPrice();
    this.returnCoins();
    this._nextDisplayMessage = "THANK YOU";
    inventoryItem.quantity--;
    return true;
  }

}


module.exports = VendingMachine;