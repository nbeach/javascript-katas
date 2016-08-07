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

  });


});
