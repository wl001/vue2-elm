<!--点击商品 商品详情页-->
<template>
  <transition name="move">
   <!--是否显示商品详情页-->
    <div v-show="showFlag" class="food"  ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back"  @click="hide">
            <i class="icon-arrow_lift fa fa-chevron-left"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail_">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div  @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <!--商品评价组件-->
          <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <!--商品评价组件-->
          <!--商品评论区-->
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                  class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'fa fa-thumbs-up':rating.rateType===0,'fa fa-thumbs-down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
        <!--商品评论区-->
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll' //滚动依赖
  import cartcontrol from '../cartcontrol/cartcontrol.vue'//引用购买数量的增加减少组件
  import split from '../split/split.vue'//分割线
  import ratingselect from '../ratingselect/ratingselect.vue'//商品评价组件
  import {formatDate} from '../../filter';
  const ALL = 2;
  export default{
    props:{
      food:{
        type: Object
      }
    },
    data(){
      return{
        showFlag:false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods:{
      show(){
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {//重新计算滚动高度
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide() {
        this.showFlag = false;
      },
      needShow(type, text) {//筛选根据类型不同显示不同的信息
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      addFood(target) {//更改父组件方法
        this.$emit('add', target);
      },
      addFirst(event) {
        console.log( event.target)
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target); // 子组件通过 $emit触发父组件的方法 add
        Vue.set(this.food, 'count', 1);
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
          this.onlyContent = !this.onlyContent;
          this.$nextTick(() => {
              this.scroll.refresh();
          });
      }
    },
    filters: {//过滤器
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    components:{
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style scoped>
  .move-enter-active, .move-leave-active{
    transition: all 0.2s linear
  }
  .move-enter, .move-leave-active{
      transform: translate3d(100%, 0, 0)
  }

.food{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
  transform: translate3d(0, 0, 0);
}
.food .food-content .image-header{
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.food .food-content .image-header img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.food .food-content .image-header .back{
    position: absolute;
    top: 10px;
    left: 0;
  }
.food .food-content .image-header .back .icon-arrow_lift{
  display: block;
  padding: 10px;
  font-size: 20px;
  color: #fff;
}
  .content{
    position: relative;
    padding: 18px;
  }
  .content .title{
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }
  .content .detail_{
    margin-bottom: 18px;
    line-height: 10px;
    height: 10px;
    font-size: 0;
  }
  .content .detail_ .sell-count, .content .detail_ .rating{
    display: inline-block;
    font-size: 10px;
    color: rgb(147, 153, 159);
    margin-right: 12px
}
  .content .price{
    font-weight: 700;
    line-height: 24px;
  }
  .content  .price .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }
  .content .price .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .content  .cartcontrol-wrapper{
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
  .content  .buy{
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 12px;
    font-size: 10px;
    color: #fff;
    background: rgb(0, 160, 220);
    opacity: 1;
  }
  .fade-enter-active,.fade-leave-active{
    transition: all 0.2s
  }

.fade-enter, .fade-leave-active{
       opacity: 0;
       z-index: -1
 }
  .info{
    padding: 18px
  }
  .info  .title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .info  .text{
    line-height: 24px;
    padding: 0 8px;
    font-size: 12px;
    color: rgb(77, 85, 93);
  }
  .rating{
    padding-top: 18px
  }

  .rating .title{
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .rating-wrapper{
    padding: 0 18px
  }
  .rating-wrapper .rating-item{
    position: relative;
    padding: 16px 0;
    border-bottom:1px solid rgba(7, 17, 27, 0.1);
  }
  .rating-wrapper .rating-item .user{
    position: absolute;
    right: 0;
    top: 16px;
    line-height: 12px;
    font-size: 0;
  }
  .rating-wrapper .rating-item .user .name{
    display: inline-block;
    margin-right: 6px;
    vertical-align: top;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .rating-wrapper .rating-item .user .avatar{
    border-radius: 50%
  }
  .rating-wrapper .rating-item .time{
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .rating-wrapper .rating-item .text{
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }
  .fa-thumbs-up,.fa-thumbs-down{
    margin-right: 4px;
    line-height: 16px;
    font-size: 12px;
  }
  .fa-thumbs-up {
    color: rgb(0, 160, 220)
  }
  .fa-thumbs-down {
    color: rgb(147, 153, 159)
  }
  .rating-wrapper .no-rating{
    padding: 16px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }

</style>
