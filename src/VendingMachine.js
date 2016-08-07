class VendingMachine {

  constructor(acceptedCoins) {
    this._acceptedCoins = acceptedCoins;
    this._credit = 0;
  }

  getDisplayMessage() {
      return "INSERT COIN";
  }

  insertCoin(insertedCoin) {
    return true;
  }


}


module.exports = VendingMachine;