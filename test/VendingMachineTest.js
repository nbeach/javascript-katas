var expect = require('chai').expect;
let VendingMachine = require('../src/VendingMachine');
let CircularObject = require('../src/CircularObject');
let Coin = require('../src/Coin');

describe('VendingMachine', function() {
  let vendingMachine;

  describe('when no credit', function() {

    beforeEach(function() {
      vendingMachine = new VendingMachine();
    });

      it("shows an insert coin message on the display", function() {
        let message = vendingMachine.getDisplayMessage();
        expect(message).to.equal("INSERT COIN");
      });

  });

  describe('when a coin is inserted', function() {
    let acceptedCoins;

    beforeEach(function() {
      acceptedCoins = [
        new Coin(1, 2, 3),
        new Coin(4, 5, 6)
      ];

      vendingMachine = new VendingMachine(acceptedCoins);
    });

    describe('and it is an accepted coin', function() {

      it("tells that the coin was accepted", function() {
        let coin = acceptedCoins[0];
        let object = new CircularObject(coin.getDiameter(), coin.getWeight());

        let isValidCoin = vendingMachine.insertCoin(object);

        expect(isValidCoin).to.be.true;
      });

    });

  });


});
