<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import VConsole from 'vconsole/dist/vconsole.min.js'
import wx from 'weixin-js-sdk'
import axios from 'axios'
import { configWX } from './services/utils'
export default {
  name: 'app',
  methods: {
  },
  mounted () {
    configWX(axios, wx)
  }
}
</script>

<style lang="scss">
@import "./assets/css/common.scss";
  body{
    background: #F3F7F7;
  }
  html, body, #app{
    height: 100%;
  }
html,body{
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-overflow-scrolling: auto;
}
* {
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

</style>
