/**计算规则相关函数类 */
const weightMap = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1
}
// */下沉，+=上浮
/**
   * 2. 解析tokens，生成ast
   * @param tokens 
   * @returns AST
   * 生成策略：
   * 维护lastOpr指针 -> 最后一个运算符所在节点
   * 如遇到新的运算符，与lastOpr比较优先级
   *  * 如果优先级更高，节点下沉
   *  * 如果优先级一样，在lastOpr节点的右上方插入
   *  * 如果优先级更低，需找到最后一个低优运算符指针(本场景较简单，只有两个优先级，acc即为目标指针)，节点上浮
   */
 export function genTree (tokens) {
  let lastOpr = null
  return tokens.reduce((acc, cur, index) => {
    if (index === 0) {
      return {
        value: cur
      }
    }
    if (isOperator(cur)) {
      if (!lastOpr) { // 第一个运算符
        acc = {
          operator: cur,
          left: acc
        }
        lastOpr = acc
        return acc
      }
      switch (priorityComparison(cur, lastOpr.operator)) {
        case 1: {
          const old = lastOpr.right
          lastOpr.right = {
            operator: cur,
            left: old,
            parent: lastOpr
          }
          lastOpr = lastOpr.right
          // lastOpr.parent = 
          break
        }
        case -1: { // 需找到最近的一个低优运算符指针，本场景只有两个优先级，可以找acc
          acc = {
            operator: cur,
            left: acc
          }
          lastOpr = acc
          break
        }
        case 0: {
          if (!lastOpr.parent) { // 说明在顶部节点
            acc = {
              operator: cur,
              left: acc
            }
            lastOpr = acc
          } else {
            lastOpr.parent.right = {
              operator: cur,
              left: lastOpr,
              parent: lastOpr.parent
            }
            lastOpr = lastOpr.parent.right
          }
        }
      }
    } else { // 如果不是operator，插入右节点
      if (cur == 0 && lastOpr.operator === '/') { // 考虑除以0的情况
        throw new Error ('分母不能为0')
      }
      lastOpr.right = {
        value: cur
      }
    }
    return acc
  }, {})
}
function isOperator (str) {
  return /[\+\-\*\/]/.test(str)
}
function priorityComparison (x, y) {
  return weightMap[x] - weightMap[y]
}

function calcValue (px, py, rule) {
  const [x, y] = [Number(px), Number(py)]
  switch(rule) {
    case '+': {
      return x + y
    }
    case '-': {
      return x - y
    }
    case '*': {
      return x * y
    }
    case '/': {
      return x / y
    }
  }
}

/**
 * 生成tokens
 * @param str 
 * @returns 
 */
 export function genTokens (str) {
  if (!/^(\d|\s|\+|\-|\*|\/)+$/.test(str)) {
    throw new Error('请检查输入，只支持数字与四则运算符"+-*/" ')
  }
  const s = str.replace(/\s/g, '')
  let arr = []
  for (let char of s) {
    const len = arr.length
    if (len && !isOperator(arr[len - 1]) && !isOperator(char)) { // 考虑字符串连续的情况 -> 最后一位与当前位均不是运算符
      arr[len - 1] = `${arr[len - 1]}${char}`
      continue
    }
    arr.push(char)
  }
  return arr
}
/**
 * 根据ast计算结果
 * @param {} ast 
 */
export function visitor (node) {
  if (node.operator) {
    return calcValue(visitor(node.left), visitor(node.right), node.operator)
  } else {
    return node.value
  }
}