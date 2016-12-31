let expect = require('chai').expect;
let InfixToPostfix = require('../src/InfixToPostfix');

describe("InfixToPostfix", () => {
  [
    {input: "a + b + c",                  expected: "ab+c+",        case: "only addition"},
    {input: "a - b - c",                  expected: "ab-c-",        case: "only subtraction"},
    {input: "a * b * c",                  expected: "ab*c*",        case: "only multiplication"},
    {input: "a / b / c",                  expected: "ab/c/",        case: "only division"},
    {input: "a ^ b ^ c",                  expected: "ab^c^",        case: "only exponents"},
    {input: "a ^ b + c - d * e / f",      expected: "ab^c+de*f/-",  case: "operators of mixed precedence"},
    {input: "a * ( b + c )",              expected: "abc+*",        case: "parenthesis"},
    {input: "a * ( b + c * d ^ e ) + f",  expected: "abcde^*+*f+",  case: "operators of mixed precedence and parenthesis"}
  ].forEach((parameters) => {
    it(`converts expressions with ${parameters.case}`, () => {
      expect(InfixToPostfix(parameters.input)).to.equal(parameters.expected);
    });
  });

});
