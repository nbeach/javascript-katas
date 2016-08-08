var expect = require('chai').expect;
let Product = require('../src/Product');

describe('ProductTest', function() {
  let product;

  beforeEach(function() {
    product = new Product('Candy', 10);
  });

  describe('when compared to another product', function() {

    describe('which is equal', function () {

      it("reports they are equal", function () {
        let otherProduct = new Product(product.getName(), product.getPrice());

        expect(product.equals(otherProduct)).to.be.true;
      });

    });

    describe('which has a different name', function() {

      it("reports they are not equal", function() {
        let otherProduct = new Product("otherName", product.getPrice());

        expect(product.equals(otherProduct)).to.be.false;
      });

    });
  });




});
