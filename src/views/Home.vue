<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="btn" @click="getDatas" v-if="!isLogin">登录</div>
    <div class="name" v-if="isLogin">杜京亚</div>
    <div class="btn" @click="logout">退出</div>
    <div id="qrcode" class="qrcode" v-if="qrcodeURl!==''">
      <img :src="qrcodeURl">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { http } from '../utils/http'
import * as API from '../utils/api'
let timer = null
export default {
  name: 'Home',
  data () {
    return {
      qrcodeURl: '',
      isLogin: false
    }
  },
  components: {
    HelloWorld
  },
  mounted () {

  },
  methods: {
    getDatas () {
      const params = {
        deviceCode: '33:44:55:66'
      }
      http({
        baseUrl: API.base,
        url: API.genQRCode,
        method: 'POST',
        params: JSON.stringify(params)
      }, (res) => {
        console.log(res)
        if (res && res.data && res.data.c === 200) {
          this.qrcodeURl = res.data.d.qrcodeUrl
          timer = setInterval(() => {
            this.getLogin()
          }, 1000)
          console.log(timer)
        }
      }, (err) => {
        console.log('-----2', err)
      })
    },
    getLogin () {
      const params = {
        deviceCode: '33:44:55:66'
      }
      http({
        baseUrl: API.base,
        url: API.login,
        method: 'POST',
        params: JSON.stringify(params)
      }, (res) => {
        console.log(res)
        if (res && res.data && res.data.c === 200) {
          console.log(res, 100000)
          this.isLogin = true
          clearInterval(timer)
        }
      }, (err) => {
        console.log('-----2', err)
      })
    },
    logout () {
      const params = {
        deviceCode: '33:44:55:66'
      }
      http({
        baseUrl: API.base,
        url: API.logout,
        method: 'POST',
        params: JSON.stringify(params)
      }, (res) => {
        console.log(res)
        if (res && res.data && res.data.c === 200) {
          alert('成功退出')
        }
      }, (err) => {
        console.log('-----2', err)
      })
    }
  }
}
</script>
<style lang="scss">
  :root {
    --border-radius: 5px;
    --box-shadow: 2px 2px 10px;
    --color: #118bee;
    --color-accent: #118bee0b;
    --color-bg: #fff;
    --color-bg-secondary: #e9e9e9;
    --color-secondary: #920de9;
    --color-secondary-accent: #920de90b;
    --color-shadow: #f4f4f4;
    --color-text: #000;
    --color-text-secondary: #999;
    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    --hover-brightness: 1.2;
    --justify-important: center;
    --justify-normal: left;
    --line-height: 150%;
    --width-card: 285px;
    --width-card-medium: 460px;
    --width-card-wide: 800px;
    --width-content: 1080px;
  }
  .btn{
    width: 100px;
    height: 40px;
    margin: 20px auto;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background: #42b983;
    border-radius: 5px;
    cursor: pointer;
  }
  .qrcode{
    width: 200px;
    height: 200px;
    margin: 20px auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
