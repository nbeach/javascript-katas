let FizzBuzz = (values) => values.map((value) => {
    let isDivisbleBy3 = value % 3 === 0;
    let isDivisbleBy5 = value % 5 === 0;

    if(isDivisbleBy3 && isDivisbleBy5) {
      return "fizzbuzz";
    } else if(isDivisbleBy3) {
      return "fizz";
    } else if(isDivisbleBy5) {
      return "buzz";
    } else {
      return value;
    }
  });

module.exports = FizzBuzz;
