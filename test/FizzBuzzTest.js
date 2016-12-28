let expect = require('chai').expect;
let FizzBuzz = require('../src/FizzBuzz');

describe("FizzBuzz", () => {

  it("when numbers are given returns numbers",
    () => expect(FizzBuzz([1, 4])).to.deep.equal([1, 4]));

  it("when multiples of 3 are given returns fizz",
    () => expect(FizzBuzz([3, 9])).to.deep.equal(["fizz", "fizz"]));

  it("when multiples of 5 are given returns buzz",
    () => expect(FizzBuzz([10, 25])).to.deep.equal(["buzz", "buzz"]));

  it("when multiple of 3 and 5 are given returns fizzbuzz",
    () => expect(FizzBuzz([15, 30])).to.deep.equal(["fizzbuzz", "fizzbuzz"]));

  it("when values of mixed divisibility are given returns results in order matching the input",
      () => expect(FizzBuzz([1, 3, 10, 15])).to.deep.equal([1, "fizz", "buzz", "fizzbuzz"]));

});
