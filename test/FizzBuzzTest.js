let expect = require('chai').expect;
let paramIt = require('./lib/parameterized.js');
let FizzBuzz = require('../src/FizzBuzz');

describe("FizzBuzz", () => {

    paramIt("#case", test => {
      expect(FizzBuzz(test.input)).to.deep.equal(test.expected);
    }, [
      {input: [1, 4],         expected: [1, 4],                          case: "when numbers are given returns numbers"},
      {input: [3, 9],         expected: ["fizz", "fizz"],                case: "when multiples of 3 are given returns fizz"},
      {input: [10, 25],       expected: ["buzz", "buzz"],                case: "when multiples of 5 are given returns buzz"},
      {input: [15, 30],       expected: ["fizzbuzz", "fizzbuzz"],        case: "when multiple of 3 and 5 are given returns fizzbuzz"},
      {input: [1, 3, 10, 15], expected: [1, "fizz", "buzz", "fizzbuzz"], case: "when values of mixed divisibility are given returns results in order matching the input"}
    ]);
});
