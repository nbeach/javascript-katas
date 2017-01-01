let expect = require('chai').expect;
let FizzBuzz = require('../src/FizzBuzz');

describe("FizzBuzz", () => {
  [
    {input: [1, 4],         expected: [1, 4],                          name: "when numbers are given returns numbers"},
    {input: [3, 9],         expected: ["fizz", "fizz"],                name: "when multiples of 3 are given returns fizz"},
    {input: [10, 25],       expected: ["buzz", "buzz"],                name: "when multiples of 5 are given returns buzz"},
    {input: [15, 30],       expected: ["fizzbuzz", "fizzbuzz"],        name: "when multiple of 3 and 5 are given returns fizzbuzz"},
    {input: [1, 3, 10, 15], expected: [1, "fizz", "buzz", "fizzbuzz"], name: "when values of mixed divisibility are given returns results in order matching the input"}
  ].forEach((test) => {
    it(test.name, () => expect(FizzBuzz(test.input)).to.deep.equal(test.expected));
  });

});
