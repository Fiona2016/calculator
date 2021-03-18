const defaultOpt = {
  rule: str => str.split('')
}
class Token {
  constructor (options) {
    this.options = Object.assign(defaultOpt, options)
  }
  tokenize (str) {
    return this.options.rule.call(this, str)
  }
}
export default Token