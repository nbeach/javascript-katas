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

    });

  });


});
