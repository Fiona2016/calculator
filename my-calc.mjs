import Engine from './engine'
import { genTokens, genTree, visitor } from './calc'
class myCalculator {
  constructor(options) {
    this.toFixed = options.toFixed || 3
    this._calc = new Engine({
      tokenRule: genTokens,
      parseRule: genTree,
      runner: visitor
    })
  }
  calc (str) {
    const r = this._calc.run(str)
    // console.log('***r', r)
    return `${str} = ${Number(r).toFixed(this.toFixed)}`
  }
}
export default myCalculator