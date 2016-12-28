var expect = require('chai').expect;
let Product = require('../../../src/VendingMachine/domain/Product');

describe('ProductTest', function() {
  let product;

  beforeEach(function() {
    product = new Product('Candy', 10);
  });

  describe('when compared to another product', function() {

    function testProductComparisonResult(name, price, result) {
      let otherProduct = new Product(name, price);

      expect(product.equals(otherProduct)).to.equal(result);
    }

    describe('which is equal', function () {

      it("reports they are equal", function () {
        testProductComparisonResult(product.getName(), product.getPrice(), true);
      });

    });

    describe('which has a different name', function() {

      it("reports they are not equal", function() {
        testProductComparisonResult("otherName", product.getPrice(), false);
      });

    });

    describe('which has a different price', function() {

      it("reports they are not equal", function() {
        testProductComparisonResult(product.getName(), 20, false);
      });

    });
  });




});
