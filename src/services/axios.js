import axios from 'axios'
import store from 'store'
import qs from 'qs'

// options.type 定义文传输格式  formData file 默认是json， 复杂的请求可以使用http 请求，简单的可以用下面的server请求
const http = (options, callback, failBack) => {
  let method = options.method ? options.method.toUpperCase() : 'POST'
  let appKey = store.get('appKey') || ''
  let headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'appkey': appKey
  }
  options.params = options.params || {}
  if (options.type && options.type.toUpperCase() === 'FORMDATA') {
    // 处理请求头
    headers['Content-Type'] = 'multipart/form-data'
    // 处理请求数据
    let formData = new FormData()
    for (let key in options.params) {
      formData.append(key, options.params[key])
    }
    options.params = formData
  } else if (options.type && options.type.toUpperCase() === 'FILE') {
    // 处理请求头
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  if (options.headers) {
    headers = Object.assign(headers, options.headers)
  }
  console.log('请求头', headers)
  axios({
    url: options.baseUrl + options.url,
    method: method,
    data: method === 'POST' ? options.params : '',
    params: method === 'GET' ? options.params : '',
    withCredentials: false,
    transformRequest: [function (data) {
      if (options.type && options.type.toUpperCase() === 'FILE') {
        console.log('是FILE')
        var submitData = qs.stringify(data)
            // console.log('转化后', submitData)
        return submitData
      } else {
        console.log('不是---是FILE')
        return data
      }
    }],
    headers: headers,
    timeout: 120 * 1000
  }).then(res => {
    if (callback && typeof callback === 'function') {
      callback(res)
    }
  }).catch(ex => {
    console.log('请求错误', ex)
    if (failBack && typeof failBack === 'function') {
      failBack(ex)
    }
  })
}

// 单一处理请求，没有请求数据格式特殊要求的可以使用此方式
const server = (options, callback, failBack) => {
  let method = options.method ? options.method.toUpperCase() : 'POST'
  axios({
    url: options.baseUrl + options.url,
    method: method,
    data: method === 'POST' ? options.params : '',
    params: method === 'GET' ? options.params : '',
    withCredentials: false,
    headers: options.headers,
    timeout: 120 * 1000
  }).then(res => {
    if (callback && typeof callback === 'function') {
      callback(res)
    }
  }).catch(ex => {
    console.log('请求错误', ex)
    if (failBack && typeof failBack === 'function') {
      failBack(ex)
    }
  })
}

export {
  http,
  server
}
