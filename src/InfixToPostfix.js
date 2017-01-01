const _ = require("lodash");

const InfixToPostfix = (expression) => {
  let parts = expression.split(" ");
  return convertExpression(parts, "", []);
};

module.exports = InfixToPostfix;


const convertExpression = (infix, postfix, operators) => {
  if(infix.length === 0) {
      return postfix + operators.reduce((operator, acc) => acc + operator, "");
  } else {
    let symbol = infix.shift();
    let action = _.find(symbolActions, a => a.when(symbol));
    [operators, postfix] = action.then(operators, postfix, symbol);
    return convertExpression(infix, postfix, operators);
  }
};

const handleOperator = (operators, postfix, operator) => {
  if(operators.length > 0) {
    let top = operators[operators.length - 1];
    if(precedence(operator) >= precedence(top)) {
      postfix += operators.pop();
    }
  }
  operators.push(operator);
  return [operators, postfix];
};

const handleTerm = (operators, postfix, symbol) => {
  postfix += symbol;
  return [operators, postfix];
};

const handleClosingParenthesis = (operators, postfix) => {
  let operator = operators.pop();
  if(operator !== "(") {
    return handleClosingParenthesis(operators, postfix + operator)
  } else {
    return [operators, postfix];
  }
};

const handleOpeningParenthesis = (operators, postfix, symbol) => {
  operators.push(symbol);
  return [operators, postfix];
};

const precedence = (symbol) => {
  switch(symbol) {
    case "^": return 1;
    case "*": return 2;
    case "/": return 2;
    case "+": return 3;
    case "-": return 3;
    default: return 999;
  }
};

const isOperator = (symbol) => {
  return precedence(symbol) !== 999;
};

const symbolActions = [
  {when: isOperator,                then: handleOperator},
  {when: symbol => symbol === "(",  then: handleOpeningParenthesis},
  {when: symbol => symbol === ")",  then: handleClosingParenthesis},
  {when: () => true,                then: handleTerm}
];
