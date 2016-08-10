var expect = require('chai').expect;
let Coin = require('../../src/domain/Coin');

describe('CoinTest', function() {
  let coin;

  beforeEach(function() {
    coin = new Coin(10, 20, 30);
  });

  describe('when compared to another coin', function() {

    function testCoinComparisonResult(diameter, weight, value, result) {
      let otherCoin = new Coin(diameter, weight, value);

      expect(coin.equals(otherCoin)).to.equal(result);
    }

    describe('which is equal', function() {

      it("reports they are equal", function() {
        testCoinComparisonResult(coin.getDiameter(), coin.getWeight(), coin.getValue(), true);
      });

    });

    describe('which has a different diameter', function() {

      it("reports they are not equal", function() {
        testCoinComparisonResult(3, coin.getWeight(), coin.getValue(), false);
      });

    });

    describe('which has a different weight', function() {

      it("reports they are not equal", function() {
        testCoinComparisonResult(coin.getDiameter(), 4, coin.getValue(), false);
      });

    });

    describe('which has a different value', function() {

      it("reports they are not equal", function() {
        testCoinComparisonResult(coin.getDiameter(), coin.getWeight(), 100, false);
      });

    });
  });


});
