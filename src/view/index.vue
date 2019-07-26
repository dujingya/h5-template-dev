<!-- 中医问卷题目 -->
<template>
  <div class="container">
    <van-swipe-cell>
      <template slot="left">
        <van-button square type="primary" text="选择" />
      </template>

      <van-cell :border="false" title="单元格" value="内容" />

      <template slot="right">
        <van-button square type="danger" text="删除" />
        <van-button square type="primary" text="收藏"/>
      </template>
    </van-swipe-cell>
  </div>
</template>
<script>
  // import store from 'store'
  // import {http} from '../services/axios'
  // import * as API from '../services/url'
  // import { IsWX, wxLogin } from '../services/utils'
  import { SwipeCell, Toast } from 'vant'

  export default {
    data () {
      return {
        count: 0,
        isLoading: false
      }
    },
    components: {
      SwipeCell,
      Toast
    },
    created () {
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        // this.isWX = IsWX() // 是否是在微信里打开
        // if (this.isWX && !this.userId) {
        //   this.userId = store.get('userId') || ''
        //   wxLogin(API, http, this, store)
        // }
      }
    }
  }
</script>
<style lang="scss">
</style>
