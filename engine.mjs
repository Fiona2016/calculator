import Parse from './parse'
import Token from './token'
class Engine {
  constructor(options) {
    this._tokenizer = new Token({
      rule: options.tokenRule // fixme 空值需要处理一下
    })
    this._parser = new Parse({
      parseRule: options.parseRule // fixme 不传的情况处理
    })
    this._runner = options.runner
  }
  run (str) {
    this.tokens = this._tokenizer.tokenize(str) // 解析拿到tokens
    // console.log('***this.tokens: ', this.tokens)
    this.ast = this._parser.parse(this.tokens) // 根据tokens生成ast
    // console.log('****this.ast', this.ast)
    return this._runner(this.ast)
  }
}
export default Engine
