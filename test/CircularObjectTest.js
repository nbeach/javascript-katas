var expect = require('chai').expect;
let CircularObject = require('../src/CircularObject');

describe('CircularObjectTest', function() {
  let object;

  beforeEach(function() {
    object = new CircularObject(10, 20);
  });

  describe('when compared to another object', function() {

    describe('which is equal', function() {

      it("reports they are equal", function() {
        let otherObject = new CircularObject(object.getDiameter(), object.getWeight());

        expect(object.equals(otherObject)).to.be.true;
      });

    });

    describe('which has a different diameter', function() {

      it("reports they are not equal", function() {
        let otherObject = new CircularObject(3, object.getWeight());

        expect(object.equals(otherObject)).to.be.false;
      });

    });

    describe('which has a different weight', function() {

      it("reports they are not equal", function() {
        let otherObject = new CircularObject(object.getDiameter(), 4);

        expect(object.equals(otherObject)).to.be.false;
      });

    });

  });


});
