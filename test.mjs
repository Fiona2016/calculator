import Calculator from './calclator'
const calc = new Calculator({
  // toFixed: 5
})
const testStr = '3 + 40 / 35 + 123 / 123 * 2'
console.log(JSON.stringify(calc.parse(testStr), '', 2))
console.log(calc.calc(testStr))