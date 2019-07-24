export let lkDrDev = 'https://ftdw-wx-test.op.laikang.com'
export let phrAppKey = 'c26652c5e4bab1f9'
export let phrAppSecrect = 'f134abdec26652c5e4bab1f93ad8855b'
export let wxAppKey = 'cLH0hbqiR'
export let phrUrlServer = 'https://api-qa.op.laikang.com' // qa api phr网关
export let phrUrl = 'http://lk-phr-test.cloud.enndata.cn' // qa api phr网关
export let questionNaireUrl2 = 'http://lk-m-questionnaire-qa.op.laikang.com/#/' // 问卷的地址 qa
export let vdItemClickUrl = 'https://m.laikang.com/audioQa/#/' // 声音辩识 qa
export let pdItemClickUrl = 'http://m.laikang.com/qa/#/' // 体质辨识 qa

if (process.env.NODE_ENV === 'qualityAssurance') {
  wxAppKey = 'cLH0hbqiR'
  lkDrDev = 'https://ftdw-wx-test.op.laikang.com' // 李明远接口 无网关
  phrUrlServer = 'https://api-qa.op.laikang.com' // qa api phr网关
  questionNaireUrl2 = 'http://lk-m-questionnaire-qa.op.laikang.com/#/' // 问卷的地址 qa
  vdItemClickUrl = 'https://m.laikang.com/audioQa/#/' // 声音辩识 qa
  pdItemClickUrl = 'http://m.laikang.com/qa/#/' // 体质辨识 qa
  phrUrl = 'http://lk-phr-test.cloud.enndata.cn' // phr 跳转链接域名 qa
} else if (process.env.NODE_ENV === 'production') {
  wxAppKey = 'fPEPQ6jig'
  lkDrDev = 'https://lk-xchx-mianshezhen-web-pro.op.laikang.com' // 李明远接口
  phrUrlServer = 'https://api-pro.op.laikang.com' // pro api phr网关
  questionNaireUrl2 = 'https://lk-m-questionnaire-pro.op.laikang.com/#/' // 问卷的地址 pro
  vdItemClickUrl = 'https://m.laikang.com/audioPro/#/' // 声音辩识 pro
  pdItemClickUrl = 'http://m.laikang.com/pro/#/' // 体质辨识 pro
  phrUrl = 'https://lk-phr-pro.op.laikang.com' // phr 跳转链接域名 pro
}

export const wxWebLogin = '/h5/webLogin/wxWebLogin' // 微信登录
export const getUserResultList = '/report/getUserResultList' // 历史报告接口

