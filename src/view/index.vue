<!-- 中医问卷题目 -->
<template>
  <div class="container">
    <van-field
      readonly
      clickable
      :value="value"
      @touchstart.native.stop="show = true"
    />

    <van-number-keyboard
      v-model="value"
      :show="show"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>
<script>
  import store from 'store'
  import {http} from '../services/axios'
  import * as API from '../services/url'
  import { IsWX, wxLogin } from '../services/utils'
  import { NumberKeyboard } from 'vant'

  export default {
    data () {
      return {
        show: true,
        value: ''
      }
    },
    components: {
      NumberKeyboard
    },
    created () {
    },
    mounted () {
      this.init()
    },
    methods: {
      onInput (value) {
        console.log(value)
      },
      onDelete () {
        console.log('删除')
      },
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
</style>
