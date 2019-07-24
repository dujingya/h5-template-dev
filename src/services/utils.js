import shal from 'sha1'
import { Base64 } from 'js-base64'
import qs from 'qs'

export const doSignToken = (url, appKey, secret, data) => {
    // 如果是GET 请求需要把参数也要拼到url后面
  if (data) {
    url = `${url}?${qs.stringify(data)}`
  }
  let date = new Date()
  let timestamp = date.getTime()
  let appkeyStr = appKey || ''
  let secretStr = secret || '' // 获取secret
  let sing = url + secretStr + timestamp
  let shalStr = shal(sing)
  let tokenStr = Base64.encode(`${appkeyStr}:${timestamp}:${shalStr}`)
  return `Bearer ${tokenStr}`
}
// 把时间戳，appKey, appSecrect, 参数， 请求地址拼接成字符串
export const doSignSha1 = (url, data = {}, timestamp, appKey, appSecrect) => {
  let appkeyStr = appKey || 'xokjhyuapq'
  let appScretStr = appSecrect || 'a0017da4e33cb6fca2d855aa1e28c7f9'
  let tempArray = [appkeyStr, appScretStr, timestamp, JSON.stringify(data), url]
  let sortResult = tempArray.sort()
  let tmpString = ''
  for (let i = 0; i < sortResult.length; i++) {
    tmpString += sortResult[i]
  }
  return shal(tmpString)
}

// 3.判断当前运行环境是不是微信
export const IsWX = () => {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}

// 4.获取参数
export const getUrlParam = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r !== null) return unescape(r[2])
  return null
}
// 5.微信登录，后端调用微信API登录后，直接调用后端接口就行
export const wxLogin = (API, http, _this, store, cb) => {
  let paramsCode = getUrlParam('code')
  const code = sessionStorage.getItem('code')
  if (!paramsCode && !code) {
    let url = location.href.split('#')
    let url1 = url[1]
    let url0 = url[0]
    url0 = url0.split('?')[0]
    let resUrl = url0 + '#' + url1
    let encodUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a92fdf84e241fcf&redirect_uri=' + encodeURIComponent(resUrl) + '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1 #wechat_redirect'
    window.location.replace(encodUrl)
  } else if (!code) {
    if (_this.loading) {
      return
    }
    _this.loading = true
    _this.$vux.loading.show({
      text: ''
    })
    sessionStorage.setItem('code', paramsCode)
    let params = JSON.stringify({
      logincode: paramsCode,
      ip: sessionStorage.getItem('ip'),
      shareCode: ''
    })
    http({
      baseUrl: API.lkDrDev,
      url: API.wxWebLogin,
      method: 'POST',
      params: params
    }, (res) => {
      if (res.data.c === 2000) {
        let resData = res.data.d
        _this.userId = resData.userId
        store.set('userInfo', resData)
        store.set('userId', resData.userId)
        store.set('userToken', resData.UserToken)
        store.set('avatarUrl', resData.avatarUrl)
        store.set('nickName', resData.nickName)
        let url = window.location.href.split('#')
        let url0 = url[0]
        url0 = url0.split('?')[0]
        store.set('fetchServiceUrl', url0)
        if (cb && typeof cb === 'function') {
          cb()
        }
      } else {
        _this.$vux.toast.text(res.data.m)
        sessionStorage.removeItem('code')
      }
      _this.$vux.loading.hide()
      _this.loading = false
    }, (ex) => {
      _this.$vux.loading.hide()
      _this.loading = false
      sessionStorage.removeItem('code')
      _this.$vux.toast.text('登录失败')
    })
  }
}

// 6.获取ul容器当前已滚动的高度
export const getScrollTop = (_this) => {
  return _this.$refs.viewBox.scrollTop
}

// 7.获取当前可视范围的高度
export const getClientHeight = () => {
  let clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
  }
  return clientHeight
}

// 8.获取ul容器的高度
export const getScrollHeight = (_this) => {
  return _this.$refs.viewBox.scrollHeight
}

// 9.微信config授权, 通过接口请求返回 获取授权所需要的相关信息
export const configWX = (axios, wx) => {
  let windowUrl = decodeURI(decodeURI(window.location.href))
  let isWX = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
  if (!isWX) {
    return
  }
  // 配置微信 config信息
  var data
  if (windowUrl.split('#')[0]) {
    data = {
      url: windowUrl.split('#')[0]
    }
  } else {
    data = {
      url: windowUrl
    }
  }
  data.url = encodeURIComponent(data.url)
  // 获取授权信息
  let url = 'https://lk-xchx-mianshezhen-web-pro.op.laikang.com/ftdw/wxAuth/getAuth'
  axios({
    url: url,
    method: 'get',
    params: data
  }).then(res => {
    if (res.data.c === 200) {
      let resData = res.data.d
      wx.config({
        debug: false,
        appId: resData.appId,
        timestamp: resData.timestamp, // 时间戳
        nonceStr: resData.nonceStr, // 随机串
        signature: resData.signature, // 必填，签名，
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ] // 必填，需要使用的JS接口列表
      })
    }
  }).catch(err => {
    console.log('err--getAuth', err)
  })
}
