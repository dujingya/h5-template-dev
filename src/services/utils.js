import shal from 'sha1'
import { Base64 } from 'js-base64'
import qs from 'qs'
import { Toast, Notify } from 'vant'
// 1 接口请求添加签名加密
export const doSignToken = (url, appKey, appSecret, data) => {
    // 如果是GET 请求需要把参数也要拼到url后面
  if (data) {
    url = `${url}?${qs.stringify(data)}`
  }
  let date = new Date()
  let timestamp = date.getTime()
  let appkeyStr = appKey || ''
  let appSecretStr = appSecret || '' // 获取appSecret
  let sing = url + appSecretStr + timestamp
  let shalStr = shal(sing)
  let tokenStr = Base64.encode(`${appkeyStr}:${timestamp}:${shalStr}`)
  return `Bearer ${tokenStr}`
}

// 3.判断当前运行环境是不是微信
export const IsWX = () => {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}

// 4.获取参数
export const getUrlParam = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var regRewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  var q = window.location.pathname.substr(1).match(regRewrite)
  if (r != null) {
    return unescape(r[2])
  } else if (q != null) {
    return unescape(q[2])
  } else {
    return null
  }
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
    // if (_this.isLoading) {
    //   return
    // }
    _this.isLoading = true
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
        console.log(_this.userId, 11111111999999999)
        store.set('userInfo', resData)
        store.set('userId', resData.userId)
        store.set('userToken', resData.UserToken)
        store.set('avatarUrl', resData.avatarUrl)
        store.set('nickName', resData.nickName)
        let url = `${window.location.host}${window.location.pathname}`
        store.set('fetchServiceUrl', url)
        if (cb && typeof cb === 'function') {
          cb()
        }
      } else {
        sessionStorage.removeItem('code')
      }
      _this.isLoading = false
    }, (ex) => {
      _this.isLoading = false
      sessionStorage.removeItem('code')
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
// 10 错误提示
export const toastMsg = (res, _this) => {
  if (res && res.data && res.data.message) {
    Toast(res.data.message)
  } else {
    if (res && res.status && res.status === 403) {
      let errMsg = res.data.split('-[gateway')
      if (errMsg) {
        Toast(errMsg[0] + '暂无权限访问！')
      } else {
        Toast('40002,暂无权限访问!')
      }
    } else {
      Toast('数据异常，请求失败!')
    }
  }
  _this.loadError = false
}
export const notifyMsg = () => {
  Notify({type: 'success', message: '保存成功', duration: 1000, background: '#51B79C'})
}
// 状态码的错误集合
// RequestNoAppkey        = 40001 // 请求缺失 appkey
// RequestInvalidAppkey   = 40002 // 请求 appkey 无效
// ServerStoped           = 40003 // 服务已停止
// NoMatchApi             = 40004 // 未找到匹配的接口
// NoServer               = 40005 // 未找到接口配置的服务
// RewriteNotMatch        = 40006 // 接口 URL 重写不匹配
// AuthSignMiss           = 40007 // 未找到签名信息
// AuthParseSignErr       = 40008 // 签名信息解析失败
// AuthSignTimeout        = 40009 // 签名信息失效
// AuthSignAppkeyNotMatch = 40010 // 签名 appkey 与请求头 appkey 不匹配
// AuthSignAppkeyInvalid  = 40011 // 签名 appkey 无效
// AuthSignInvalid        = 40012 // 签名信息无效
// UpstreamServerErr      = 40013 // 请求上游服务器错误
// TargetIPInBL           = 40014 // 请求 IP 命中黑名单
// CircuitClose           = 40015 // 熔断器：资源处于封闭状态
// CircuitHalfLimited     = 40016 // 熔断器：资源是电路的一半，流量限制
// QPSLimited             = 40017 // 最大 QPS 限制
// AppQPSLimited          = 40018 // App 最大 QPS 限制
// ValidationFailure      = 40019 // 验证失败
// TargetIPNoInWL         = 40020 // 请求 IP 不在白名单中
