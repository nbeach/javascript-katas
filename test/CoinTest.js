var expect = require('chai').expect;
let Coin = require('../src/Coin');

describe('CoinTest', function() {
  let coin;

  beforeEach(function() {
    coin = new Coin(10, 20, 30);
  });

  describe('when compared to another coin', function() {

    describe('which is equal', function() {

      it("reports they are equal", function() {
        let otherObject = new Coin(coin.getDiameter(), coin.getWeight(), coin.getValue());

        expect(coin.equals(otherObject)).to.be.true;
      });

    });

    describe('which has a different diameter', function() {

      it("reports they are not equal", function() {
        let otherObject = new Coin(3, coin.getWeight(), coin.getValue());

        expect(coin.equals(otherObject)).to.be.false;
      });

    });

    describe('which has a different weight', function() {

      it("reports they are not equal", function() {
        let otherObject = new Coin(coin.getDiameter(), 4, coin.getValue());

        expect(coin.equals(otherObject)).to.be.false;
      });

    });

  });


});
