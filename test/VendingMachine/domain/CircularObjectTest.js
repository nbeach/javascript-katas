var expect = require('chai').expect;
let CircularObject = require('../../../src/VendingMachine/domain/CircularObject');

describe('CircularObjectTest', () => {
  let object;

  beforeEach(() => {
    object = new CircularObject(10, 20);
  });

  describe('when compared to another object', () => {

    function testCircularObjectComparisonResult(diameter, weight, result) {
      let otherObject = new CircularObject(diameter, weight);

      expect(object.equals(otherObject)).to.equal(result);
    }

    describe('which is equal', () => {

      it("reports they are equal", () => {
        testCircularObjectComparisonResult(object.getDiameter(), object.getWeight(), true);
      });

    });

    describe('which has a different diameter', () => {

      it("reports they are not equal", () => {
        testCircularObjectComparisonResult(3, object.getWeight(), false);
      });

    });

    describe('which has a different weight', () => {

      it("reports they are not equal", () => {
        testCircularObjectComparisonResult(object.getDiameter(), 4, false);
      });

    });

  });


});
