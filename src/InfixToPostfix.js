let _ = require("lodash");

let handle_closing_parenthesis = (operators, postfix) => {
  let operator = operators.pop();
 if(operator !== "(") {
   return handle_closing_parenthesis(operators, postfix + operator)
 } else {
   return [operators, postfix];
 }
};

let handle_opening_parenthesis = (operators, postfix, symbol) => {
  operators.push(symbol);
  return [operators, postfix];
};

let handle_term = (operators, postfix, symbol) => {
  postfix += symbol;
  return [operators, postfix];
};

let handle_operator = (operators, postfix, operator) => {
  if(operators.length > 0) {
    let top = operators[operators.length - 1];
    if(precedence(operator) >= precedence(top)) {
      postfix += operators.pop();
    }
  }
  operators.push(operator);
  return [operators, postfix];
};

let precedence = (symbol) => {
  switch(symbol) {
    case "^": return 1;
    case "*": return 2;
    case "/": return 2;
    case "+": return 3;
    case "-": return 3;
    default: return 999;
  }
};

let is_operator = (symbol) => {
  return precedence(symbol) !== 999;
};

let actions = [
  {when: is_operator,               then: handle_operator},
  {when: symbol => symbol === "(",  then: handle_opening_parenthesis},
  {when: symbol => symbol === ")",  then: handle_closing_parenthesis},
  {when: () => true,                then: handle_term}
];

let convert = (infix, postfix, operators) => {
  if(infix.length === 0) {
      return postfix + operators.reduce((operator, acc) => acc + operator, "");
  } else {
    let symbol = infix.shift();
    [operators, postfix] = _.find(actions, action => action.when(symbol)).then(operators, postfix, symbol);
    return convert(infix, postfix, operators);
  }
};

let InfixToPostfix = (expression) => {
  let parts = expression.split(" ");
  return convert(parts, "", []);
};

module.exports = InfixToPostfix;
