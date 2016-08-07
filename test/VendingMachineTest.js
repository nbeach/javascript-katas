let expect = require('chai').expect;
let _ = require('lodash');

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
      let acceptedCoin;

      beforeEach(function() {
        acceptedCoin = acceptedCoins[1];
      });

      it("tells that the coin was accepted", function() {
        let object = new CircularObject(acceptedCoin.getDiameter(), acceptedCoin.getWeight());

        let isValidCoin = vendingMachine.insertCoin(object);

        expect(isValidCoin).to.be.true;
      });

      it("displays credit for the coin on the display", function() {
        vendingMachine.insertCoin(acceptedCoin);
        expect(vendingMachine.getDisplayMessage()).to.contain(acceptedCoin.getValue().toFixed(2));
      });

    });

    describe('and it is an unrecognized coin', function() {
      let object;

      beforeEach(function() {
        object = new CircularObject(100, 200);
      });

      it("tells that the coin was rejected", function() {
        let isValidCoin = vendingMachine.insertCoin(object);
        expect(isValidCoin).to.be.false;
      });

      it("adds no credit", function() {
        vendingMachine.insertCoin(object);
        expect(vendingMachine.getDisplayMessage()).to.equal("INSERT COIN");
      });

      it("puts the coin in the coin return", function() {
        vendingMachine.insertCoin(object);

        let coinReturnContents = vendingMachine.emptyCoinReturn();
        expect(coinReturnContents.length).to.equal(1);
        expect(coinReturnContents[0]).to.equal(object);
      });

    });

  });

  describe("when the coin return contents is emptied", function() {
    let unrecognizedCoin;

    beforeEach(function() {
      vendingMachine = new VendingMachine();
      unrecognizedCoin = new CircularObject(100, 200);
    });


    it("clears the coin return contents", function() {
      vendingMachine.insertCoin(unrecognizedCoin);

      let retrievedCoins = vendingMachine.emptyCoinReturn();
      expect(retrievedCoins.length).to.equal(1);

      retrievedCoins = vendingMachine.emptyCoinReturn();
      expect(retrievedCoins.length).to.equal(0);
    });

  });

  describe("when the coin return is pushed", function() {
    let coinValued1, coinValued3;

    beforeEach(function() {
      coinValued1 = new Coin(2, 2, 1);
      coinValued3 = new Coin(1, 1, 3);
      vendingMachine = new VendingMachine([coinValued1, coinValued3]);
    });

    it("puts coins totalling the current credit in the coin return", function() {
      vendingMachine.insertCoin(coinValued1);
      vendingMachine.insertCoin(coinValued1);
      vendingMachine.insertCoin(coinValued3);

      vendingMachine.returnCoins();
      let returnedCoins = vendingMachine.emptyCoinReturn();

      let totalValue = _.reduce(returnedCoins, function(sum, coin) {
        return sum + coin.getValue();
      }, 0);

      expect(totalValue).to.equal(5);
    });

  });

});
