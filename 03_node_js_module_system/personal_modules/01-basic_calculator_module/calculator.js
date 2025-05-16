function add(n1, n2){
  const regex = /^[0-9]+$/g;
  if(n1.match(regex) === null || n2.match(regex) === null){
    throw new Error("invalid number(s), please enter correct numbers!");
  }
  return n1 + n2;
}

function subtract(n1, n2){
  const regex = /^[0-9]+$/g;
  if(n1.match(regex) === null || n2.match(regex) === null){
    throw new Error("invalid number(s), please enter correct numbers!");
  }
  return n1 - n2;
}

function multiply(n1, n2){
  const regex = /^[0-9]+$/g;
  if(n1.match(regex) === null || n2.match(regex) === null){
    throw new Error("invalid number(s), please enter correct numbers!");
  }
  return n1 * n2;
}

function divide(n1, n2){
  const regex = /^[0-9]+$/g;
  if(n1.match(regex) === null || n2.match(regex) === null){
    throw new Error("invalid number(s), please enter correct numbers!");
  }
  if(n2 === 0){
    throw new Error("The second value cannot be zero!");
  }
  return n1 / n2;
}

export {add, subtract, multiply, divide};