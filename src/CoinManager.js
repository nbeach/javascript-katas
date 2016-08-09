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

  addCoin(coin) {
    let matchedInventory = _.find(this._inventory, (inventoryCoin) => inventoryCoin.coin.equals(coin));

    if(_.isUndefined(matchedInventory)) {
      this._inventory.push({
        coin: coin,
        quantity: 1
      });
    } else {
      matchedInventory.quantity++;
    }
  }

}

module.exports = CoinManager;