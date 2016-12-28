var expect = require('chai').expect;
let Coin = require('../../../src/VendingMachine/domain/Coin');

describe('CoinTest', () => {
  let coin;

  beforeEach(() => {
    coin = new Coin(10, 20, 30);
  });

  describe('when compared to another coin', () => {

    function testCoinComparisonResult(diameter, weight, value, result) {
      let otherCoin = new Coin(diameter, weight, value);

      expect(coin.equals(otherCoin)).to.equal(result);
    }

    describe('which is equal', () => {

      it("reports they are equal", () => {
        testCoinComparisonResult(coin.getDiameter(), coin.getWeight(), coin.getValue(), true);
      });

    });

    describe('which has a different diameter', () => {

      it("reports they are not equal", () => {
        testCoinComparisonResult(3, coin.getWeight(), coin.getValue(), false);
      });

    });

    describe('which has a different weight', () => {

      it("reports they are not equal", () => {
        testCoinComparisonResult(coin.getDiameter(), 4, coin.getValue(), false);
      });

    });

    describe('which has a different value', () => {

      it("reports they are not equal", () => {
        testCoinComparisonResult(coin.getDiameter(), coin.getWeight(), 100, false);
      });

    });
  });


});
