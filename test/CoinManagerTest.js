let expect = require('chai').expect;
let _ = require('lodash');

let CoinManager = require('../src/CoinManager');
let Coin = require('../src/Coin');

describe('CoinManager', function() {
  let coinManager, quarter, dime, nickel;

  describe('when making change', function() {

    beforeEach(function() {
      quarter = new Coin(1, 1, 25);
      dime = new Coin(2, 2, 10);
      nickel = new Coin(3, 3, 5);

      let inventory = [
        {
          coin: quarter,
          quantity: 100
        },
        {
          coin: dime,
          quantity: 100
        },
        {
          coin: nickel,
          quantity: 100
        }
      ];

      coinManager = new CoinManager([nickel, quarter, dime], inventory);
    });


    it("returns coins totaling the requested amount", function() {
      var amount = 30;
      let returnedCoins = coinManager.makeChange(amount);
      let totalValue = _.reduce(returnedCoins, function(sum, coin) {
        return sum + coin.getValue();
      }, 0);

      expect(totalValue).to.equal(amount);
    });

    describe("and available coins are sufficient", function() {

      it("returns the largest possible coins denominations", function() {
        var amount = 50;
        let returnedCoins = coinManager.makeChange(amount);

        expect(returnedCoins.length).to.equal(2);
        expect(returnedCoins[0].getValue()).to.equal(25);
        expect(returnedCoins[1].getValue()).to.equal(25);
      });

    });


  });

});