var expect = require('chai').expect;
let VendingMachine = require('../src/VendingMachine');

describe('VendingMachine', function() {
  let vendingMachine;

  beforeEach(function() {
    vendingMachine = new VendingMachine();
  });

  describe('when no credit', function() {

      it("shows an insert coin message on the display", function() {
        let message = vendingMachine.getDisplayMessage();
        expect(message).to.equal("INSERT COIN");
      });

  });


});
