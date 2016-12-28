let expect = require('chai').expect;
let sinon = require('sinon');

let VendingMachine = require('../../src/VendingMachine/VendingMachine');
let CircularObject = require('../../src/VendingMachine/domain/CircularObject');
let CoinManager = require('../../src/VendingMachine/CoinManager');
let Coin = require('../../src/VendingMachine/domain/Coin');
let Product = require('../../src/VendingMachine/domain/Product');

describe('VendingMachine', () => {
  let vendingMachine, coinManager, quarter, dime, nickel;

  beforeEach(() => {
    coinManager = sinon.createStubInstance(CoinManager);
    coinManager.canMakeChange.returns(true);
    coinManager.getCoinFor.returnsArg(0);
    vendingMachine = new VendingMachine(coinManager);

    quarter = new Coin(1, 1, 25);
    dime = new Coin(2, 2, 10);
    nickel = new Coin(3, 3, 5);
  });

  describe('when no credit', () => {

    it("shows an insert coin message on the display", () => {
      let message = vendingMachine.getDisplayMessage();
      expect(message).to.equal("INSERT COIN");
    });

  });

  describe('when a coin is inserted', () => {

    describe('and it is an accepted coin', () => {

      beforeEach(() => {
        coinManager.getCoinFor.onCall(0).returns(new Coin(1, 1, 1));
      });

      it("tells that the coin was accepted", () => {
        let object = new CircularObject(new CircularObject(1, 1));
        let isValidCoin = vendingMachine.insertCoin(object);

        expect(isValidCoin).to.be.true;
      });

      it("displays credit for the coin on the display", () => {
        vendingMachine.insertCoin(new CircularObject(1, 1));
        expect(vendingMachine.getDisplayMessage()).to.contain("0.01");
      });

    });

    describe('and it is an unrecognized coin', () => {
      let object;
      beforeEach(() => {
        object = new CircularObject(1, 1);
        coinManager.getCoinFor.onCall(0).returns(undefined);
      });

      it("tells that the coin was rejected", () => {
        let isValidCoin = vendingMachine.insertCoin(object);
        expect(isValidCoin).to.be.false;
      });

      it("adds no credit", () => {
        vendingMachine.insertCoin(object);
        expect(vendingMachine.getDisplayMessage()).to.equal("INSERT COIN");
      });

      it("puts the coin in the coin return", () => {

        vendingMachine.insertCoin(object);

        let coinReturnContents = vendingMachine.emptyCoinReturn();
        expect(coinReturnContents.length).to.equal(1);
        expect(coinReturnContents[0]).to.equal(object);
      });

    });

  });

  describe("when the coin return contents is emptied", () => {

    beforeEach(() => {
      coinManager.getCoinFor.onCall(0).returns(undefined);
    });

    it("clears the coin return contents", () => {
      vendingMachine.insertCoin(new CircularObject(1,1));

      let retrievedCoins = vendingMachine.emptyCoinReturn();
      expect(retrievedCoins.length).to.equal(1);

      retrievedCoins = vendingMachine.emptyCoinReturn();
      expect(retrievedCoins.length).to.equal(0);
    });

  });

  describe("when the coin return is pushed", () => {

    it("puts the change in the coin return", () => {
      coinManager.makeChange.onCall(0).returns([quarter, nickel]);

      vendingMachine.insertCoin(quarter);
      vendingMachine.insertCoin(nickel);

      vendingMachine.returnCoins();
      let returnedCoins = vendingMachine.emptyCoinReturn();

      let totalValue = returnedCoins.reduce((sum, coin) => sum + coin.getValue(), 0);

      expect(totalValue).to.equal(30);
    });

  });

  it("tells what products are available", () => {
    let productInventory = [
      {
        product: new Product('Cola', 100),
        quantity: 1
      },
      {
        product: new Product('Chips', 50),
        quantity: 1
      },
      {
        product: new Product('Candy', 65),
        quantity: 1
      }
    ];

    vendingMachine = new VendingMachine(coinManager, productInventory);

    var expectedProducts = productInventory.map(productInventory => productInventory.product);
    var products = vendingMachine.getProducts();

    expect(products.length).to.equal(expectedProducts.length);
    for(let expectedProduct of expectedProducts) {
      expect(products).to.contain(expectedProduct);
    }
  });

  describe("when a product is selected", () => {
    let productInventory, chips, cola;

    beforeEach(() => {
      chips = new Product('Chips', 50);
      cola =  new Product('Cola', 100);

      productInventory = [
        {
          product: cola,
          quantity: 0
        },
        {
          product: chips,
          quantity: 1
        }
      ];

      vendingMachine = new VendingMachine(coinManager, productInventory);
    });

    describe("and it is in stock", () => {

      describe("and there is sufficient credit", () => {
        let dispensed;

        beforeEach(() => {
          coinManager.makeChange.onCall(0).returns([nickel]);

          vendingMachine.insertCoin(quarter);
          vendingMachine.insertCoin(quarter);
          vendingMachine.insertCoin(nickel);
          dispensed = vendingMachine.dispense(chips);
        });

        it("dispenses the product", () => {
          expect(dispensed).to.be.true;
        });

        it("displays thank you on the display", () => {
          expect(vendingMachine.getDisplayMessage()).to.equal("THANK YOU");
        });

        it("displays insert coin after displaying the thank you", () => {
          vendingMachine.getDisplayMessage();
          expect(vendingMachine.getDisplayMessage()).to.equal("INSERT COIN");
        });

        it("depletes product inventory upon dispensing", () => {
          expect(dispensed).to.be.true;

          vendingMachine.insertCoin(quarter);
          vendingMachine.insertCoin(quarter);
          vendingMachine.dispense(chips);
          expect(vendingMachine.getDisplayMessage()).to.equal("SOLD OUT")
        });

        it("returns the remaining change", () => {
          let returnedCoins = vendingMachine.emptyCoinReturn();
          expect(returnedCoins.length).to.equal(1);
          expect(returnedCoins[0]).to.equal(nickel)
        });

      });

      describe("and there is insufficient credit", () => {
        let dispensed;

        beforeEach(() => {
          vendingMachine.insertCoin(quarter);
          dispensed = vendingMachine.dispense(chips);
        });

        it("does not dispense the product", () => {
          expect(dispensed).to.be.false;
        });

        it("displays the product price on the display", () => {
          expect(vendingMachine.getDisplayMessage()).to.contain(chips.getPrice().toFixed(2));
        });

        it("returns to displaying the current credit after displaying the product price", () => {
          vendingMachine.getDisplayMessage();
          expect(vendingMachine.getDisplayMessage()).to.equal("0.25");
        });
      });

    });

    describe("and it is sold out", () => {
      let result;

      beforeEach(() => {
        result = vendingMachine.dispense(cola);
      });

      it("does not dispense the product", () => {
        expect(result).to.be.false;
      });

      it("displays sold out on the display", () => {
        expect(vendingMachine.getDisplayMessage()).to.equal("SOLD OUT");
      });

      it("returns to displaying insert coin after displaying sold out", () => {
        vendingMachine.getDisplayMessage();
        expect(vendingMachine.getDisplayMessage()).to.equal("INSERT COIN");
      });

    });

  });

  describe("when it is not possible to make change for all products", () => {

    it('displays exact change only message', () => {
      coinManager.canMakeChange.returns(false);
      expect(vendingMachine.getDisplayMessage()).to.equal("EXACT CHANGE ONLY");
    });

  });


});
