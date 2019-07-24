<!-- 中医问卷题目 reportlist 备份-->
<template>
  <div :class="['containt2']">
    <div class="jishuzhichi">来康提供技术支持</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        noDataText: '',
        dataList: [],
        userId: '',
        userToken: '',
        avatarUrl: '',
        nickName: '',
        appKey: '',
        currentPage: 1,
        totalPage: -1,
        loading: false,
        showScroller: false,
        totalCount: 0
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style lang=scss>
  .containt2 {
    /*position: fixed;*/
    /*top: 0;*/
    /*bottom: 0;*/
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    color: #ffffff;
    background-color: #EDEDED;
    -webkit-overflow-scrolling: auto;
    .noData{
      text-align: center;
      padding-top: 20px;
      background-color: #33C09B;
    }
    .topBOX{
      background: #EDEDED;
      z-index: 10000;
      width: 100%;
      height: 74px;
      padding-top: 38px;
    }
    .breakfast_headBox{
      background: #33C09B;
      border-radius: 50px 50px 0 0;
      width: 100%;
      height:40px;
      /*display: flex;
      flex-direction: column;
      align-items: center;*/
      /*top:55px;46*/
      position: relative;

      .breakfast_head{
        position: absolute;
        height: 60px;
        border-radius: 60px;
        left: 12%;
        /*margin: 0 46px;*/
        background: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        top:-30px;
        /*width: 283px;*/
        width: 76%;
        box-sizing: border-box;
        box-shadow: 0 2px 4px 0 rgba(57,236,220,0.08), 0 7px 12px 0 rgba(0,45,41,0.11);
        .img_head{
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .head_text{
          flex:1;
          font-size: 14px;
          color: #454848;
          margin-left: 16px;
        }
        .total{
          font-size: 12px;
          color: #B8BDBD;
        }
      }
    }

    .breakfast_wrapper{
      padding-bottom: 16px;
      padding: 0 16px 0;
      position: relative;
      background: #33C09B;
      /*min-height: 200px;*/
      li{
        height: 68px;
        /*margin-top: 0.3rem;*/
        border-bottom: 1px solid #37C8A2;
      }
      .time{
        font-size: 10px;
        padding-top: 5px;
        color: #AAF4E1;
        .line{
          margin: 0 7px 0 17px;
        }
        .source{
          font-size: 12px;
          color: #C8FFF1;
          position: relative;
          left: 11px;
          &:before{
            position: absolute;
            content: '';
            width: 8px;
            height: 11px;
            background: url('../assets/img/icon_source.png') no-repeat;
            background-size: 8px 11px;
            left: -11px;
            top: 1px;
          }
        }
      }
      .zheng{
        height: 68px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .moreZheng{
          font-size: 14px;
          color: #FFFFFF;
          font-weight: bold;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .line{
            font-size: 12px;
            color: #E6FFF8;
            margin: 0 4px;
            font-weight: normal;
          }
          .yingyong{
            font-size: 12px;
            color: #E6FFF8;
            font-weight: normal;
          }
        }
        .zhengInfo{
          display: flex;
          flex-direction: column;
          overflow: hidden;
          flex:1;
        }
        .zhengDetail{
          text-align: right;
          width: 90px;
          .icon{
            height: 15px;
            width: 3px;
            vertical-align: middle;
          }
        }
      }
      .detail{
        font-size: 12px;
        color: #AAF4E1;
      }
      .text{
        margin-right: 5px;
      }
    }
  }
  .no-data-text{
    font-size: 12px;
    color: #AAF4E1!important;
  }
  ._v-container>._v-content>.loading-layer{
    height: 100px!important;
    background-color: #33C09B;
    margin-top: -1px;
  }
</style>

