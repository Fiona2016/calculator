const defaultOpt = {
  parseRule: tokens => {}
}
class Parse {
  constructor(options) {
    this.options = Object.assign(defaultOpt, options)
  }
  /**
   * 根据token
   * @param {} tokens 
   */
  parse (tokens) {
    return this.options.parseRule.call(this, tokens)
  }
}
export default Parse
