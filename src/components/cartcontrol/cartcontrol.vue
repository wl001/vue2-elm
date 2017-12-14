<!--增加减少购买商品的按钮组件-->
<template>
  <div class="cartcontrol">
    <transition name="move">
      <div @click.stop.prevent="decreaseCart" class="cart-decrease " v-show="food.count>0">
        <span :class="{inner_trans:b}" class="inner fa fa-minus-circle"></span>
      </div>
    </transition>
      <!--数量-->
      <div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
      <!--增加按钮-->
      <div class="cart-add fa fa-plus-circle"  @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
  import Vue from 'vue'
 export default{
   data(){
     return{
       b:false
     }
   },
   props:{
     food:{
       type: Object
     }
   },
   methods:{
     addCart(event){//点击增加按钮
       this.b = true;
       // 自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
       if(!event._constructed) {//防止pc多运行一次事件
         return;
       }
       if(!this.food.count){
       //当操作外部数据变化是，就是不在Vue构造器里里的data处声明 如果能观察到需要用vue的一个接口 vue.set()
         Vue.set(this.food,'count',1)
       }else{
         this.food.count++;
       }
       //$emit是触发当前实例上的事件。附加参数都会传给监听器回调。
       this.$emit('add', event.target); // 子组件通过 $emit触发父组件的方法 add
     },
     decreaseCart(){//点击较少按钮
       if(!event._constructed) {//防止pc多运行一次事件
         return;
       }
       this.food.count--;
     }
   }
 }
</script>
<style>
.cartcontrol{
  font-size: 0;
}
.cartcontrol .cart-decrease{
  display: inline-block;
  padding: 6px;
}
.cartcontrol .cart-decrease .inner{
  display: inline-block;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0, 160, 220);
}
 .cart-count{
   display: inline-block;
   vertical-align: top;
   width: 12px;
   padding-top: 6px;
   line-height: 24px;
   text-align: center;
   font-size: 10px;
   color: rgb(147, 153, 159);
}
 .cart-add{
   display: inline-block;
   padding: 6px;
   line-height: 24px;
   font-size: 24px;
   color: rgb(0, 160, 220);
}
.move-enter-active, .move-leave-active{
  transition: all 0.4s linear;
}
/*变化成什么样 当元素出来的时候*/
.move-enter-active{
  opacity:1;
}
/*变化成什么样 当元素离开的时候*/
.move-leave-active{
  opacity:0;
  transform: translate3D(24px,0,0)  rotate(180deg);
}
/*初始状态和 离开的初始状态*/
.move-enter,.move-leave{
  opacity:0;
  transform: translate3D(24px,0,0)  rotate(180deg);
}
</style>
