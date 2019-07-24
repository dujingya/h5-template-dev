import axios from 'axios'
import qs from 'qs'
// import { TokenKey } from '@/utils/auth'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log(22222)
  }
  if (res.data && res.data.c !== 0 && res.status !== 200) {
    console.log(11111)
  }
  return res
}
let URL = 'https://ftdw-wx-test.op.laikang.com'
if (process.env.NODE_ENV === 'production') {
  URL = 'https://ftdw-wx-test.op.laikang.com'
}
let URL_Q = 'https://lk-wenda-qa.op.laikang.com'
export default {
  post (url, data, n) {
    let base = URL
    if (n) {
      base = URL_Q
    }
    return axios({
      method: 'post',
      baseURL: base,
      url,
      data: qs.stringify(data),
      timeout: 50000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params, n) {
    let base = URL
    if (n) {
      base = URL_Q
    }
    return axios({
      method: 'get',
      baseURL: base,
      url,
      params, // get 请求时带的参数
      timeout: 50000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
export {
  URL
}
