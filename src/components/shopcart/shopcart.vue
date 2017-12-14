<!--购物车和购物车详情页-->
<template >
  <div>
    <div class="shopcart">
      <!--@click="toggleList" 点击折叠显示隐藏购物车详情页-->
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <!--购物车图标-->
            <div  class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shoppingcart  fa fa-shopping-cart"></i>
            </div>
            <!--商品选择数量-->
            <div class="num" v-show="totalCount>0" >{{totalCount}} </div>
          </div>
          <!--商品选择数量-->
          <!--商品价格-->
          <div class="price" :class="{'highlight_price':totalCount>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          <!--商品价格-->
        </div>
        <!--起送费 差多少钱起送-->
        <div class="content-right"  @click.stop.prevent="pay">
          <div class="pay"  :class="payClass">{{payDesc}}</div>
        </div>
        <!--起送费 差多少钱起送-->
      </div>
      <!--购物车小球效果-->
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <!--购物车小球效果-->

      <!--购物车详情页  v-show="listShow"-->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content"  ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span >￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontral-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <!--购物车详情页-->

    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>
<script  type="text/ecmascript-6">
  import BScroll from 'better-scroll' //滚动依赖
  import cartcontrol from '../cartcontrol/cartcontrol.vue'//引用购买数量的增加减少组件
  export default{
    data(){
      return{
        //https://github.com/ustbhuangyi/vue-sell/blob/master/src/components/goods/goods.vue
        //https://www.cnblogs.com/yujihang/p/6886532.html购物车小球
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    methods:{
      drop(el) {//判断点击加减按钮的位置 购物车小球效果
//        console.log(el)
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el) {//购物车小球动画
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {//购物车小球动画
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {//购物车小球动画
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      //点击底部购物车显示 购物车详情页 shopcart-list
      toggleList(){
        if(!this.totalCount){
          return;
        }
        this.fold = !this.fold;
      },
      empty(){//清空购物车
        this.selectFoods.forEach( (food)=>{
          food.count = 0;
        })
      },
      hideList(){
        this.fold = true
      },
      pay(){//去结算
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
    },
    props:{
      selectFoods:{//选择食物 所有的状态变化都依赖 selectFoods
        type:Array,
        default(){//默认为函数 保存一个选择商品的数组
          return [
//            {
//              price:10,
//              count: 1
//            }
          ];
        }
      },
      deliveryPrice:{
        type:Number,
        default:0  //默认为0
      },
      minPrice:{
        type:Number,
        default:0
      }
    },
    computed:{
      //依赖selectFoods
      totalPrice(){//所选商品总价
        let total =0;
        this.selectFoods.forEach( (food)=>{
          total += food.price * food.count
        });
        return total;
      },
      totalCount(){//所选商品数量
        let count =0;
        this.selectFoods.forEach( (food)=>{
          count += food.count;
      });
        return count;
      },
      payDesc(){//起送费 差多少钱起送计算
        if(this.totalPrice === 0){
            return `￥ ${this.minPrice} 元起送`;
        }else if(this.totalPrice < this.minPrice){
            let diff = this.minPrice -  this.totalPrice;
           return `还差￥${diff}元起送`
        }else{
          return `去结算`;
        }
      },
      payClass(){//计算价格多少 然后赋值对应的 class类名 给样式
        if(this.totalPrice < this.minPrice){
          return 'not-enough'
        }else{
          return 'enough'
        }
      },
      listShow(){//购物车详情页方法
        if(!this.totalCount){
          this.fold = true;
          return false;
        }
        let show = !this.fold
        //购物车详情页滚动功能
        if(show){
          this.$nextTick( ()=>{
            if(!this.scroll){
              //找到dom结构
              this.scroll =  new BScroll(this.$refs.listContent, {
                click: true
              });
            }else {
              //refresh（）接口 重新计算适口差进行滚动
              this.scroll.refresh();
            }
          })
        }
        return show;
      }

    },
    components:{
      cartcontrol
    }
  }
</script>
<style>
 .shopcart{
   position: fixed;
   left:0;
   bottom:0;
   z-index: 50;
   width:100%;
   height:48px;
 }
  .shopcart .content{
    display: flex;
    background: #141d27;
    height: 48px;
    font-size: 0;
  }
 .shopcart .content .content-left{
    flex:1;
 }
 .shopcart .content .content-left .logo-wrapper{
   display: inline-block;
   position: relative;
   top:-10px;
   margin: 0 4px 0 4px;
   padding: 6px;
   width:56px;
   height:56px;
   box-sizing: border-box;
   vertical-align: top;
   border-radius: 50%;
   background: #141d27;

 }
 .shopcart .content .content-left .logo-wrapper .logo{
   display: inline-block;
   width:100%;
   height:100%;
   border-radius: 50%;
   background: #2b343c;
   text-align: center;
 }
 .shopcart .content .content-left .logo-wrapper .highlight{
    background: rgb(0,160,220);
 }
 .highlight .fa-shopping-cart{
   color: #fff !important;
 }
 .shopcart .content .content-left .logo-wrapper .logo .fa-shopping-cart{
   font-size: 24px;
   color: #80858a;
   line-height: 44px;
 }
 .shopcart .content .content-left .logo-wrapper .num{
   position: absolute;
   top:0;
   right:0;
   width:24px;
   height:16px;
   background: rgb(240,20,20);
   color: white;
   line-height: 16px;
   text-align: center;
   border-radius: 16px;
   font-size: 9px;
   font-weight: 700;
   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);

 }
  .shopcart .content .content-left .price{
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right:12px;
    box-sizing: border-box;
    border-right:1px solid rgba(255 ,255 ,255 ,0.1) ;
    font-size: 16px;
    font-weight: 700;
    color:rgba(255 ,255 ,255 ,0.4);
 }
 .shopcart .content .content-left .highlight_price{
   color:#fff;
 }
 .shopcart .content .content-left  .desc{
   display: inline-block;
   vertical-align: top;
   line-height: 24px;
   margin: 12px 0 0 12px;
   font-size: 10px;
   font-weight: 400;
   color:rgba(255 ,255 ,255 ,0.4);

 }
 .shopcart .content .content-right{
   flex:0 0 105px;
   width:105px;
 }
 .shopcart .content .content-right .pay{
   height: 48px;
   line-height: 48px;
   text-align: center;
   font-size: 12px;
   color:rgba(255 ,255 ,255 ,0.4);
   font-weight: 700;
   background: #2b333b;
 }
 .shopcart .content .content-right .not-enough{
   background: #2b333b;
 }
 .shopcart .content .content-right .enough{
   background: #00b43c;
   color: #fff;
 }
  .ball-container .ball{
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }
 .ball-container .ball .inner{
   width: 16px;
   height: 16px;
   border-radius: 50%;
   background: rgb(0, 160, 220);
   transition: all 0.4s linear;
 }
 .shopcart-list{
   position: absolute;
   top:0;
   left:0;
   z-index: -1;
   width: 100%;
   transform: translate3d(0, -100%, 0)
 }
 .fold-enter-active, .fold-leave-active{
   transition: all 0.5s
 }
 .fold-enter, .fold-leave-active{
   transform: translate3d(0, 0, 0)
 }
 .shopcart-list .list-header{
   height: 40px;
   line-height: 40px;
   padding: 0 18px;
   background: #f3f5f7;
   border-bottom: 1px solid rgba(7, 17, 27, 0.1);
 }
 .shopcart-list .list-header .title{
   float: left;
   font-size: 14px;
   color: rgb(7, 17, 27);
 }
 .shopcart-list .list-header .empty{
   float: right;
   font-size: 12px;
   color: rgb(0, 160, 220);
 }
 .shopcart-list .list-content{
   padding: 0 18px;
   max-height: 217px;
   overflow: hidden;
   background: #fff;
 }
 .shopcart-list .list-content .food{
   position: relative;
   padding: 12px 0;
   box-sizing: border-box;
   border-bottom:1px solid  rgba(7, 17, 27, 0.1);
 }
 .shopcart-list .list-content .food .name{
   line-height: 24px;
   font-size: 14px;
   color: rgb(7, 17, 27);
 }
 .shopcart-list .list-content .food  .price{
   position: absolute;
   right: 90px;
   bottom: 12px;
   line-height: 24px;
   font-size: 14px;
   font-weight: 700;
   color: rgb(240, 20, 20);
 }
 .shopcart-list .list-content .food  .cartcontral-wrapper{
   position: absolute;
   right: 0;
   bottom: 6px;
 }
 .list-mask{
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 40;
   backdrop-filter: blur(10px);
   opacity: 1;
   background: rgba(7, 17, 27, 0.6);
 }
 .fade-enter-active, .fade-leave-active{
   transition: all 0.5s;
 }
 .fade-enter, .fade-leave-active{
   opacity: 0;
   background: rgba(7, 17, 27, 0);
 }

</style>
