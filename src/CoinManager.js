let _ = require('lodash');

class CoinManager {

  constructor(acceptedCoins, inventory) {
    this._acceptedCoins = acceptedCoins;
    this._inventory = inventory;
  }

  makeChange(amount) {
    return this._makeChange(amount, true);
  }

  _makeChange(amount, removeCoinsFromInventory) {
    this._inventory.sort((a, b) => a.coin.getValue() - b.coin.getValue()).reverse();

    let coinsToReturn = [];
    for(let inventory of this._inventory) {
      let quantityToReturn = Math.floor(amount / inventory.coin.getValue());
      if(quantityToReturn > inventory.quantity) {
        quantityToReturn = inventory.quantity;
      }

      for(let i = 0; i < quantityToReturn; i ++) {
        coinsToReturn.push(inventory.coin);
      }

      if(removeCoinsFromInventory) {
        inventory.quantity -= quantityToReturn;
      }

      amount -= inventory.coin.getValue() * quantityToReturn;

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

  //This assumes that each coin is divisible by the smallest coin. Given that then in order to be able to make
  //change for any given product and inserted coins then you need to be able to make change for every multiple
  //of the smallest coin such that: (n * smallestCoinValue) <= (largestCoinValue - smallestCoinValue)
  canMakeChange() {
    let acceptedCoinsByValue = _.sortBy(this._acceptedCoins, (coin) => coin.getValue());
    let smallestCoinValue = acceptedCoinsByValue.shift().getValue();
    let largestCoinValue = acceptedCoinsByValue.pop().getValue();
    let changeAmount = smallestCoinValue;
    while(changeAmount <= largestCoinValue - smallestCoinValue) {

      let coins = this._makeChange(changeAmount, false);
      let totalValue = _.reduce(coins, function (sum, coin) {
        return sum + coin.getValue();
      }, 0);

      if(totalValue != changeAmount) {
        return false;
      }

      changeAmount += smallestCoinValue;
    }

    return true;

  }

}

module.exports = CoinManager;