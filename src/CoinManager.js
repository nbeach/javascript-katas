let _ = require('lodash');

class CoinManager {

  constructor(acceptedCoins, inventory) {
    this._acceptedCoins = acceptedCoins;
    this._inventory = inventory;
  }

  makeChange(amount) {
    this._inventory.sort((a, b) => a.coin.getValue() - b.coin.getValue()).reverse();

    let coinsToReturn = [];
    for(let inventory of this._inventory) {
      let coin = inventory.coin;
      let quantityAvailable = inventory.quantity;

      let quantityToReturn = Math.floor(amount / coin.getValue());
      if(quantityToReturn > quantityAvailable) {
        quantityToReturn = quantityAvailable;
      }

      for(let i = 0; i < quantityToReturn; i ++) {
        coinsToReturn.push(coin);
      }

      amount -= coin.getValue() * quantityToReturn;
      inventory.quantity -= quantityToReturn;

      if(amount === 0) {
        break;
      }
    }

    return coinsToReturn;

  }

  getCoinFor(object) {
    return _.find(this._acceptedCoins, (acceptedCoin) => object.equals(acceptedCoin));
  }


  addCoin(object) {
    let matchedCoin = this.getCoinFor(object);

    if(_.isUndefined(matchedCoin)) {
      return false;
    }

    let matchedInventory = _.find(this._inventory, (inventoryCoin) => inventoryCoin.coin.equals(matchedCoin));

    if(_.isUndefined(matchedInventory)) {
      this._inventory.push({
        coin: matchedCoin,
        quantity: 1
      });
    } else {
      matchedInventory.quantity++;

    }

    return true;
  }

}

module.exports = CoinManager;