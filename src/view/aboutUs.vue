<!-- 中医问卷题目 -->
<template>
  <div class="aboutUs">
    <div class="jishuzhichi">来康提供技术支持</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {
    this.share({})
  },
  methods: {}
}
</script>
<style lang=scss scoped>
  .aboutUs{
    background: #33C09B;
    display: flex;
    flex-direction: column;
    width: 375px;
    margin: 0 auto;
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
