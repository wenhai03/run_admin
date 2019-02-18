exports.formatDate = (val) => { // 保留YYYY-MM-DD
  if (val) {
    return val.substring(0, 11)
  }
}

exports.formatTime = (val) => { // 保留HH-mm
  if (val) {
    return val.substring(11, 16)
  }
}

exports.format_ZN = (val) => {
  val = val.substring(5, 10)
  let dayjs = require('dayjs');
  return dayjs(val).format('MM月DD日')
}

exports.courseType = (val) => {
  if (val === -1) {
    return '自有训练'
  } else if (val === 0) {
    return '团课'
  } else if (val === 1) {
    return '训练营'
  } else if (val === 2) {
    return '私教'
  }
}

exports.formatStatus = (val) => {
  if (val === 0) {
    return '取消'
  } else if (val === 1) {
    return '可预约'
  } else if (val === 2) {
    return '已完成'
  } else if (val === 3) {
    return '进行中'
  }
}
