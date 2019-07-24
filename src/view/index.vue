<!-- 中医问卷题目 -->
<template>
  <div class="container">
     <div class="title">来康</div>
  </div>
</template>
<script>
  import store from 'store'
  import {http} from '../services/axios'
  import * as API from '../services/url'
  import { IsWX, wxLogin } from '../services/utils'
  export default {
    data () {
      return {
        recordFile: '',
        isWX: false,
        userId: ''
      }
    },
    created () {
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.isWX = IsWX() // 是否是在微信里打开
        if (this.isWX && !this.userId) {
          this.userId = store.get('userId') || ''
          wxLogin(API, http, this, store)
        }
      }
    }
  }
</script>
<style lang="scss">
  .container{
    background: #33C09B;
    display: flex;
    flex-direction: column;
    width: 375px;
    margin: 0 auto;
    .title{
      display: flex;
      flex-direction: column;
      width: 60px;
      font-size: 60px;
      align-content: center;
      align-items: center;
      margin: 60px auto;
    }
    .jishuzhichi{
      font-size: 12px;
      line-height: 24px;
      color: #fff;
      display: inline-block;
      position: relative;
      padding: 10px 0;
      margin: 0 auto;
      &:before{
        content: '';
        width: 0.6rem;
        position: absolute;
        height: 1px;
        background: #fff;
        top:50%;
        left: -0.7rem;
        opacity: 0.4;
      }
      &:after{
        content: '';
        width: 0.6rem;
        position: absolute;
        height: 1px;
        background: #fff;
        top:50%;
        right: -0.7rem;
        opacity: 0.4;
      }
    }
  }
</style>
