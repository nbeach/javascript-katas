var expect = require('chai').expect;
let Product = require('../../../src/VendingMachine/domain/Product');

describe('ProductTest', () => {
  let product;

  beforeEach(() => {
    product = new Product('Candy', 10);
  });

  describe('when compared to another product', () => {

    function testProductComparisonResult(name, price, result) {
      let otherProduct = new Product(name, price);

      expect(product.equals(otherProduct)).to.equal(result);
    }

    describe('which is equal', () => {

      it("reports they are equal", () => {
        testProductComparisonResult(product.getName(), product.getPrice(), true);
      });

    });

    describe('which has a different name', () => {

      it("reports they are not equal", () => {
        testProductComparisonResult("otherName", product.getPrice(), false);
      });

    });

    describe('which has a different price', () => {

      it("reports they are not equal", () => {
        testProductComparisonResult(product.getName(), 20, false);
      });

    });
  });




});
