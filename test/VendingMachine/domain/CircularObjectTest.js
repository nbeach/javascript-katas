var expect = require('chai').expect;
let CircularObject = require('../../../src/VendingMachine/domain/CircularObject');

describe('CircularObjectTest', function() {
  let object;

  beforeEach(function() {
    object = new CircularObject(10, 20);
  });

  describe('when compared to another object', function() {

    function testCircularObjectComparisonResult(diameter, weight, result) {
      let otherObject = new CircularObject(diameter, weight);

      expect(object.equals(otherObject)).to.equal(result);
    }

    describe('which is equal', function() {

      it("reports they are equal", function() {
        testCircularObjectComparisonResult(object.getDiameter(), object.getWeight(), true);
      });

    });

    describe('which has a different diameter', function() {

      it("reports they are not equal", function() {
        testCircularObjectComparisonResult(3, object.getWeight(), false);
      });

    });

    describe('which has a different weight', function() {

      it("reports they are not equal", function() {
        testCircularObjectComparisonResult(object.getDiameter(), 4, false);
      });

    });

  });


});
