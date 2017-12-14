<!--商品页面-->
<template>
    <div class="goods">
      <!--左侧菜单-->
      <!--ref="menuwrapper" 相当于拿到原生的dom-->
      <div class="menu-wrapper" ref="menuwrapper">
        <ul>
          <!--当currentIndex与index相等的时候，设置高亮-->
          <li @click="selectMenu(index,$event)"  v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index }" >
           <span class="text"> <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name}}</span>
          </li>
        </ul>
      </div>
      <!--左侧菜单-->
      <!--展示内容部分-->
      <div class="foods-wrapper" ref="foodswrapper">
        <ul>
          <!--food-list-hook用于dom操作，获取整体容器的高度-->
          <li  v-for="(item,index) in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul >
              <!-- @click="selectFood(food,$event) 点击详情页获取到food-->
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img width="57px" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <!--购物车中的按钮组建-->
                  <div class="cartcontrol-wrapper">
                      <cartcontrol  @add="addFood" :food="food"></cartcontrol>
                  </div>
                  <!--购物车中的按钮组建-->
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--展示内容部分-->

      <!--购物车列表组件-->
      <!--接受app.vue传递过来的seller数据 :delivery-price配送费  :min-price 起送费 向下传递父级组件数据-->
      <shopcart  ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
      <!--购物车列表组件-->
      <!--商品详情页组件-->
      <food  :food="selectedFood" ref="food"></food>
      <!--商品详情页组件-->
    </div>
</template>

<script type="text/ecmascript-6">
  //滚动条 http://blog.csdn.net/llx18042693031/article/details/54849002
  import BScroll from 'better-scroll' //滚动依赖
  import shopcart from '../shopcart/shopcart.vue'//引用购物车组件
  import cartcontrol from '../cartcontrol/cartcontrol.vue'//引用购买数量的增加减少组件
  import food from '../food/food.vue'//商品详情页

 export default{
   props:{
     seller:{
       type:Object
     }
   },

   data(){
     return {
       goods: [],
       listHeight:[],
       scrollY:0,
       selectedFood: {}
     }
   },
    methods:{
      selectMenu(index, event) {//点击左侧右侧滚动到相应的索引值
        // 自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
        if(!event._constructed) {
          return;
        }
        //运用BScroll接口，滚动到相应位置
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
        //获取对应元素的列表
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {//选择食物 显示商品详情页
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();//调用food子组件方法  子组件ref='food'
      },
      _drop(target) {
        // 体验优化,异步执行下落动画   拿到子组件的 drop方法
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll() {//左侧和右侧的滚动效果
        this.meunScroll = new BScroll(this.$refs.menuwrapper, {
          click: true
        });
          this.foodScroll = new BScroll(this.$refs.foodswrapper, {
            click: true,
            //探针作用，实时监测滚动位置
            probeType: 3
          });
        //设置监听滚动位置
        this.foodScroll.on('scroll', (pos) => {
          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        })
      },
      _calculateHeight() {//计算li的高度
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        //把第一个高度送入数组
        this.listHeight.push(height);
        //通过循环foodList下的dom结构，将每一个li的高度依次送入数组
        for(let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height);
        }
      },
      addFood(target) {
        this._drop(target);
      },
    },
   computed:{//计算属性
     //左侧索引
     currentIndex(){
       for(let i=0; i<this.listHeight.length; i++){
         //判断当currentIndex在height1和height2之间的时候显示
         let height1 = this.listHeight[i];
         let height2 = this.listHeight[i + 1];
         //console.log('height1:'+height1+','+'height2:'+height2)
         //最后一个区间没有height2
         if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
           return i;
         }
       }
       return 0;
     },
     selectFoods() {//选择哪个商品  观测的是data里的good【】对象
        let foods = [];
        this.goods.forEach ( (good) => {
         good.foods.forEach( (food)=>{//food 是上边遍历的food
            if(food.count){
              foods.push(food)
            }
         })
       })
      return foods;
     },
   },
   created(){
     //根据type不同 背景图片不同 classname不同 decrease对应下边的classname
     this.classMap = ['decrease_g','discount_g','guarantee_g','invoice_g','special_g']

     this.$http.get('goods').then(function(data){
       this.goods = data.body;
       //判断dom结构是否完全加载 this.$nextTick(() => {}) 保证dom渲染完毕
       this.$nextTick(function(){
         this._initScroll();//左右两侧的被隐藏的部分滚动起来
         this._calculateHeight();
       });
     },function(){
       console.log('数据请求错误')
     })
   },
   components:{//注册引用的组件
     shopcart,
     cartcontrol,
     food
   }
 }

</script>
<style>
  .goods{
    display: flex;
    overflow: hidden;
    position: absolute;
    width: 100%;
    top:174px;
    bottom: 46px;
  }
  .goods .menu-wrapper{
    flex: 0 0 80px;
    width:80px;
    background-color: #f3f5f7;
  }
  .goods .menu-wrapper .menu-item{
    display: table;
    width:56px;
    height:54px;
    line-height:14px;
    padding: 0 12px;
  }
   .current {
     position: relative;
     z-index: 10;
     margin-top: -1px;
     background: #FFFFFF;
     font-weight: 700;
     font-size: 14px;
  }

  .goods .menu-wrapper .menu-item .icon{
    display: inline-block;
    vertical-align: top;
    width:12px;
    height:12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .goods .menu-wrapper .menu-item .text{
    display: table-cell;
    font-size: 12px;
    width:56px;
    vertical-align: middle;
    border-bottom:1px solid rgba(7,17,27,0.1)
  }
  .decrease_g{
    background-image: url(decrease_3@2x.png);
  }
  .discount_g{
    background-image: url(discount_3@2x.png);
  }
  .guarantee_g {
    background-image: url(guarantee_3@2x.png);
  }
  .invoice_g {
    background-image: url(invoice_3@2x.png);
  }
  .special_g{
    background-image: url(special_3@2x.png);
  }
  .goods .foods-wrapper{
    flex: 1;
  }
  .goods .foods-wrapper .food-list .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left:2px solid #d9dde1;
    font-size: 12px;
    color:rgb(147,153,159);
    background-color: #f3f5f7;
  }
  .goods .foods-wrapper .food-list .food-item{
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    border-bottom:1px solid rgba(7,17,27,0.1);
    position: relative;
  }
  .goods .foods-wrapper .food-list .food-item:last-child{
    border:none;
    margin-bottom: 0;
  }
  .goods .foods-wrapper .food-list .food-item .icon{
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .goods .foods-wrapper .food-list .food-item .content{
    flex: 1;

  }
  .goods .foods-wrapper .food-list .food-item .content .name{
    font-size: 14px;
    height: 14px;
    margin: 2px 0px 8px 0;
    line-height: 14px;
    color:rgb(7,17,27)
  }
  .goods .foods-wrapper .food-list .food-item .content .desc{
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 10px;
    color:rgb(7,17,27)
  }
  .goods .foods-wrapper .food-list .food-item .content .extra{
    margin-bottom: 8px;
    line-height: 10px;
    font-size: 10px;
    color:rgb(7,17,27)
  }
  .goods .foods-wrapper .food-list .food-item .content .extra .count{
    margin-right: 12px;
  }
  .goods .foods-wrapper .food-list .food-item .content .price{
    font-weight: 700;
    line-height: 24px;
  }
  .goods .foods-wrapper .food-list .food-item .content .price .now{
    margin-right: 14px;
    font-size: 14px;
    color: rgb(240,20,20);
  }
  .goods .foods-wrapper .food-list .food-item .content .price .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147 ,153 , 159);
  }
  .goods .foods-wrapper .food-list .food-item .content .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  @media only screen and (max-width: 320px){
      .goods .foods-wrapper .food-list .food-item .content .cartcontrol-wrapper {
          position: absolute;
          right: -15px;
          bottom: 12px;
      }
  }
</style>
