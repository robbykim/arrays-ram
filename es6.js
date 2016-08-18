'use strict';

let varName = 'hello';
let test = true;

console.log(varName);

if (test) {
  let varName = 'goodbye';
  console.log(varName);
}

console.log(varName);

const varName2 = 'hello';
varName2 = 'goodbye';
