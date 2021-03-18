import myCalculator from './my-calc'
const myCalc = new myCalculator({toFixed: 2})

const test = str => console.log(myCalc.calc(str))

test('1 + 2')
test('1 + 2 * 3 / 4')
test('3 + 40 / 35 + 123 / 123 * 2')
test('1 + 2 / 2 * 3 + 2')
// 边界测试
// test('300 / 0')
test('aadd')