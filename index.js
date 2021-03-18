function genTree (tokens) {
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
        case -1: { // 需找到最后一个低优运算符指针，本场景只有两个优先级，找acc即可
          acc = {
            operator: cur,
            left: acc
          }
          lastOpr = acc
          break
        }
        case 0: {
          if (getOperatorLevel(cur) === 0) { // fixme, 应该向上回溯，此处优先级只有0和1，可以确认为acc
            acc = {
              operator: cur,
              left: acc
            }
            lastOpr = acc
          } else {
            // const old = lastOpr
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
        throw new Error ('can not divide zero')
      }
      lastOpr.right = {
        value: cur
      }
    }
    console.log('====', JSON.stringify(acc, '', 2))
    return acc
  }, {})
}

function isOperatorExtend (x, y) { // fixme
  const weightMap = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1
  }
  return weightMap[x] >= weightMap[y]
}

function isOperator (str) {
  return /[\+\-\*\/]/.test(str)
}

function genTokens (str) {
  if (!/^(\d|\s|\+|\-|\*|\/)+$/.test(str)) {
    throw new Error('invalid string, Please varify your input')
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

const tokens = ['1', '*', '2', '+', '2', '*', '3', '/', '4', '-', '7']
const r = genTree(tokens)
// console.log(JSON.stringify(r, '', 2))
// console.log(genTree(tokens))


//const str = '1 * 23 + 2 * 6'
//console.log(genTokens(str))
// genTokens(str)
