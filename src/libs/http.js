import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import { Loading } from 'element-ui'

let loading // 定义loading变量
function startLoading () {
  // option参数为Loading的配置项
  loading = Loading.service({
    lock: true,
    text: '内容加载中...',
    fullscreen: false,
    background: 'rgba(0,0,0,0)',
    loading: true
  })
}
function endLoading () {
  loading.close()
}

let needLoadingRequestCount = 0
export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// 请求拦截
axios.interceptors.request.use(
  config => {
    if (!config.data.data.uname) { // 登录时候不需要加载内容
      showFullScreenLoading()
    }
    return config
  }
)
// 响应拦截
axios.interceptors.response.use(
  response => {
    if (response.data.code === '401') {
      Vue.prototype.$message({
        duration: 1000,
        message: '登录已过期，请重新登录！',
        type: 'warn'
      });
      tryHideFullScreenLoading()
      router.push('/login')
      return false;
    }
    tryHideFullScreenLoading()
    return response
  },
  err => {
    tryHideFullScreenLoading()
    return Promise.reject(err)
  }
)

export function request (url, data = {}) {
  return new Promise((resolve, reject) => {
    // 发送请求的data格式： {data:{}}
    axios.post(url, {data})
      .then(response => {
        resolve(response.data)
      }, err => {
        return Promise.reject(err)
      })
  })
}
