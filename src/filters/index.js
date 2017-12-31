const urlParser = document.createElement('a')

export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}

export function count (arr) {
  return arr.length
}

export function prettyDate (date) {
  var a = new Date(date)
  return a.toDateString()
}

export function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }

  return time + label + 's'
}

export function formatDateBtk (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export function formatStatus (status) {
  var value = ''
  // alert(status)
  if (status === 200) {
    value = '正常'
  } else if (status === -1) {
    value = '锁定'
  } else if (status === -100) {
    value = '无效'
  } else if (status === 100) {
    value = '未分配'
  } else {
    value = '未知'
  }
  return value
}

export function OperationLogFilter (sb, action, target, id) {
  console.log('target is ', target)
  var finalstr = ''
  finalstr = finalstr + sb
  if (action === 1) {
    finalstr = finalstr + '添加'
  } else if (action === 2) {
    finalstr = finalstr + '删除'
  } else if (action === 3) {
    finalstr = finalstr + '修改'
  } else if (action === 4) {
    finalstr = finalstr + '查看'
  }
  finalstr = getAction(finalstr, target)
  return finalstr + ' [' + id + ']'
}

function getAction (finalstr, target) {
  if (target === 1) {
    finalstr = finalstr + '用户'
  } else if (target === 2) {
    finalstr = finalstr + '组织机构'
  } else if (target === 3) {
    finalstr = finalstr + '设备'
  } else if (target === 4) {
    finalstr = finalstr + '密码'
  }
  return finalstr
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
