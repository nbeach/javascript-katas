let expect = require('chai').expect;

let CoinManager = require('../../src/VendingMachine/CoinManager');
let Coin = require('../../src/VendingMachine/domain/Coin');
let CircularObject = require('../../src/VendingMachine/domain/CircularObject');

describe('CoinManager', function() {
  let coinManager, quarter, dime, nickel, inventory;

  describe('when making change', function() {

    beforeEach(function () {
      quarter = new Coin(1, 1, 25);
      dime = new Coin(2, 2, 10);
      nickel = new Coin(3, 3, 5);

      inventory = [
        {
          coin: quarter,
          quantity: 5
        },
        {
          coin: dime,
          quantity: 5
        },
        {
          coin: nickel,
          quantity: 5
        }
      ];

      coinManager = new CoinManager([nickel, quarter, dime], inventory);
    });


    it("returns coins totaling the requested amount", function () {
      var amount = 30;
      let returnedCoins = coinManager.makeChange(amount);
      let totalValue = returnedCoins.reduce((sum, coin) => sum + coin.getValue(), 0);

      expect(totalValue).to.equal(amount);
    });

    describe("and available coins are sufficient", function () {

      it("returns the largest possible coins denominations", function () {
        var amount = 50;
        let returnedCoins = coinManager.makeChange(amount);

        expect(returnedCoins.length).to.equal(2);
        expect(returnedCoins[0].getValue()).to.equal(25);
        expect(returnedCoins[1].getValue()).to.equal(25);
      });

    });

    describe("and larger denomination coins are unavailable", function () {

      beforeEach(function () {
        let availableCoins = [
          {
            coin: nickel,
            quantity: 10
          },
          {
            coin: quarter,
            quantity: 1
          },
          {
            coin: dime,
            quantity: 1
          }
        ];

        coinManager = new CoinManager([nickel, quarter, dime], availableCoins);
      });

      it("returns returns multiple smaller denomination coins", function () {
        let returnedCoins = coinManager.makeChange(50);

        expect(returnedCoins.length).to.equal(5);

        let quarterCount = returnedCoins.filter(quarter.equals.bind(quarter)).length;
        expect(quarterCount).to.equal(1);

        let dimeCount = returnedCoins.filter(dime.equals.bind(dime)).length;
        expect(dimeCount).to.equal(1);

        let nickelCount = returnedCoins.filter(nickel.equals.bind(nickel)).length;
        expect(nickelCount).to.equal(3);

      });

    });

    describe("when a coin is inserted", function() {


      describe("and the coin is accepted", function() {

        it("tells if the coin was accepted", function () {
          let accepted = coinManager.addCoin(nickel);
          expect(accepted).to.be.true;
        });


        it("tracks them in inventory and doesn't return coins it doesn't have", function() {
          let availableCoins = [
            {
              coin: quarter,
              quantity: 1
            }
          ];

          coinManager = new CoinManager([nickel, quarter, dime], availableCoins);
          coinManager.addCoin(dime);
          coinManager.addCoin(dime);
          coinManager.addCoin(nickel);

          let returnedCoins = coinManager.makeChange(25);

          expect(returnedCoins.length).to.equal(1);
          expect(returnedCoins[0].getValue()).to.equal(quarter.getValue());

          coinManager.addCoin(nickel);
          coinManager.addCoin(nickel);
          coinManager.addCoin(nickel);
          coinManager.addCoin(nickel);
          returnedCoins = coinManager.makeChange(20);

          expect(returnedCoins.length).to.equal(2);
          expect(returnedCoins[0].getValue()).to.equal(dime.getValue());
          expect(returnedCoins[1].getValue()).to.equal(dime.getValue());


          coinManager.addCoin(nickel);
          coinManager.addCoin(nickel);
          returnedCoins = coinManager.makeChange(10);

          expect(returnedCoins.length).to.equal(2);
          expect(returnedCoins[0].getValue()).to.equal(nickel.getValue());
          expect(returnedCoins[1].getValue()).to.equal(nickel.getValue());
        });
      });

      describe("and the coin is rejected", function() {

        it("tells if the coin was rejected", function() {
          let accepted = coinManager.addCoin(new Coin(0, 0, 0));
          expect(accepted).to.be.false;
        });

        it("does not add the rejected coin to inventory", function() {
          coinManager = new CoinManager([nickel, quarter, dime], []);
          coinManager.addCoin(new Coin(0, 0, 5));
          let coins = coinManager.makeChange(5);
          expect(coins.length).to.equal(0);
        });

      });

    });

    describe("when asked if an object matches an coin", function() {

      it("returns a match when one exists", function() {
        let accepted = coinManager.getCoinFor(new CircularObject(quarter.getDiameter(), quarter.getWeight()));
        expect(accepted).to.equal(quarter);
      });

      it("returns nothing when no matching coin", function() {
        let accepted = coinManager.getCoinFor(new CircularObject(0, 0));
        expect(accepted).to.be.undefined;
      });

    });

    describe("when asked if change can be made", function() {

      describe("and inventory is sufficient", function() {
        it('confirms it can', function() {
          expect(coinManager.canMakeChange()).to.be.true;
        });
      });


      describe("and inventory is insufficient", function() {
        it("tells it can't", function() {
          inventory[2].quantity = 0;
          expect(coinManager.canMakeChange()).to.be.false;
        });
      });

      it("does not deplete coin inventory in the process", function() {
        for(let i = 0; i < 50; i ++) {
          let canMakeChange = coinManager.canMakeChange();
          expect(canMakeChange).to.be.true;
        }
      });
    });

  });
});