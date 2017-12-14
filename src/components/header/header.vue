<template >
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <!--根据type不同 背景图片不同 classname不同  seller.supports[0].type是0 1 2 下标对应className-->
          <span class="icon " :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count"  @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="i"> > </i>
      </div>
    </div>
    <!--点击显示详情页-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"> > </i>
    </div>
    <!--点击显示详情页-->
    <div class="backgroud">
      <img :src="seller.avatar" width="100%" height="100% ">
    </div>
    <!--详情页-->
    <div v-show="detailShow" class="detail">
      <div class="detail-warpper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-warpper">
            <Star_  :size="48" :score="seller.score"></Star_>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠活动</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
              <li class="supports-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap_t[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content_">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <!--关闭详情页按钮-->
      <div class="detail-close" @click="closeDetail">
        <i class="fa fa-close"></i>
      </div>
    </div>
    <!--详情页-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        detailShow:false
      }
    },
    methods:{
      showDetail:function(){
        this.detailShow = true;
      },
      closeDetail:function(){
        this.detailShow = false;
        scrollBehavior: () => ({ y: 0 })
      }
    },
    props:{//接收父组件数据
      seller:{
        type: Object
      }
    },
    created(){
      //根据type不同 背景图片不同 classname不同 decrease对应下边的classname
      this.classMap = ['decrease','discount','guarantee','invoice','special']
      this.classMap_t = ['decrease_2','discount_2','guarantee_2','invoice_2','special_2']
    }
  }
</script>
<style scoped>
  .header{
    color: #FFFFFF;
    position: relative;
    overflow: hidden;
  }
  .header .content-wrapper{
    padding:24px 12px 18px 24px;
    font-size: 0px;
    position: relative;
  }
  .header .content-wrapper .avatar{
    display: inline-block;
    vertical-align: top;
  }
  .header .content-wrapper .content{
    display: inline-block;
    font-size:14px;
    margin-left: 16px;
  }
  .support-count{
    position: absolute;
    right:12px;
    bottom:14px;
    padding:0 8px;
    height:24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: rgba(0,0,0,0.2);
    text-align: center;
    color:white;
  }
  .support-count .count{
    font-size: 10px;
    display: inline-block;
    vertical-align: top;
  }
  .support-count .i{
    font-size: 10px;
    vertical-align: top;
    line-height: 24px;
    margin-left: 2px;
  }
  .content .title{
    margin: 2px 0 8px 0;
  }
  .content .title .brand{
    width:30px;
    height:18px;
    display: inline-block;
    background: url(brand@2x.png) no-repeat;
    background-size:100% 100% ;
  }
  .content .title .name{
    font-size: 16px;
    margin-left: 6px;
    line-height: 18px;
    font-weight: bold;
    vertical-align: top;

  }
  .content  .description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .content  .support .icon{
    display: inline-block;
    width:12px;
    height:12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .decrease{
    background-image: url(decrease_1@2x.png);
  }
  .discount{
    background-image: url(discount_1@2x.png);
  }
  .guarantee{
    background-image: url(guarantee_1@2x.png);
  }
  .invoice{
    background-image: url(invoice_1@2x.png);
  }
  .special{
    background-image: url(special_1@2x.png);
  }

  .content  .support .text{
    line-height: 12px;
    font-size: 10px;
    vertical-align: top;
  }

 body,html{
   font-weight: 200;
   line-height: 1;
   font-family: 'PingFang SC',Arial,sans-serif;
 }

  @media (-webkit-min-device-pixel-ratio:2 ) {
    .content .title .brand{
      width:30px;
      height:18px;
      display: inline-block;
      background: url(brand@2x.png) no-repeat;
      background-size:100% 100% ;
    }
  }
  @media (-webkit-min-device-pixel-ratio: 3 ) {
    .content .title .brand{
      width:30px;
      height:18px;
      display: inline-block;
      background: url(brand@3x.png) no-repeat;
      background-size:100% 100% ;
    }
  }
  .bulletin-wrapper{
    height:28px;
    line-height: 28px;;
    padding:0 22px 0 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    background: rgba(7,17,27,0.2);
  }
  .bulletin-wrapper .bulletin-title{
    display: inline-block;
    width:22px;
    height: 12px;
    background-image: url(bulletin@2x.png);
    background-size: 100% 100%;
    vertical-align: top;
    margin-top: 8px;
  }
  .bulletin-wrapper .bulletin-text{
    font-size: 12px;
    margin: 0 4px;
    vertical-align: top;
  }
  .bulletin-wrapper .icon-keyboard_arrow_right{
    position: absolute;
    right: 10px;
    font-size: 10px;
  }
  .backgroud{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: -1;
    background: rgba(7,17,27,0.5);
    filter: blur(10px);
  }
  .detail{
    position: fixed;
    z-index: 100;
    width:100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    top:0;
    left:0;
  }
  .clearfix{
    display: inline-block;
  }
  .clearfix:after{
    content: '.';
    display: block;
    height:0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
  .detail-warpper{
    min-height: 100%;
    width:100%;
  }
  .detail-warpper .detail-main{
    margin-top: 28px;
    padding-bottom: 64px;
  }
  .detail-warpper .detail-main .name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .detail-warpper .detail-main .title{
    display: flex;
    width:80%;
    margin: 28px auto 24px auto;
  }
  .detail-warpper .detail-main .title .line{
    flex: 1;
    position: relative;
    top:-6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .detail-warpper .detail-main .title .text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
  .detail-warpper .detail-main .supports{
    width: 80%;
    margin: 0 auto;
  }
  .detail-warpper .detail-main .supports .supports-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .detail-warpper .detail-main .supports .supports-item:last-child{
    margin-bottom: 0;
  }
  .detail-warpper .detail-main .supports .icon{
    display: inline-block;
    width: 13px;
    height: 13px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 13px 13px;
    background-repeat: no-repeat;
  }
  .decrease_2{
    background-image: url(decrease_2@2x.png);
  }
  .discount_2{
    background-image: url(discount_2@2x.png);
  }
  .guarantee_2{
    background-image: url(guarantee_2@2x.png);
  }
  .invoice_2{
    background-image: url(invoice_2@2x.png);
  }
  .special_2 {
    background-image: url(special_2@2x.png);
  }
  .detail-warpper .detail-main .supports .text{
    line-height: 16px;
    font-size: 12px;
    vertical-align: top;
  }
  .detail-warpper .detail-main .bulletin {
    width: 80%;
    margin: 0 auto;

  }
  .detail-warpper .detail-main .bulletin .content_{
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }
  .detail-close{
    position: relative;
    width: 32px;
    height:32px;
    margin:-65px auto 0 auto;
    clear:both;
    font-size: 32px;
  }
  .star-warpper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
</style>
