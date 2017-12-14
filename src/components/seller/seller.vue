<!--商家页面-->
<template>
    <div class="seller"  ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc ">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <!--收藏-->
                <div class="favorite" >
                    <span @click="toggleFavorite" class="icon-favorite fa fa-heart" :class="{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item" v-for="(item,index) in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <!--因为BScroll滚动需要子级超出父级的宽高度 需要计算pic-list的宽度-->
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title border-1px">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import {saveToLocal, loadFromLocal} from '../../filter';
    import star from '../star/star.vue';
    import split from '../split/split.vue';

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                favorite: (() => {
                    //读取不到 默认值为false
                    return loadFromLocal(this.seller.id, 'favorite', false);
                })()
            };
        },
        watch: {//监听seller变化 初始化Scroll 页面滚动效果
            'seller'() {//
                this.$nextTick(() => {
                    this._initScroll();
                    this._initPics();
                });
            }
        },
        mounted() {//生命周期 当dom渲染好
            //什么都没有 所以滚动效果不好使 用$watch监听seller变化
           // console.log(this.seller);
            //当跳转其他路由在回来时watch是不会执行的 滚动失效再次调用_initScroll方法
            this.$nextTick(() => {
                this._initScroll();
                this._initPics();
            });
        },
        computed: {//计算属性
            favoriteText() {
                return this.favorite ? '已收藏' : '收藏';
            }
        },
        created() {//生命周期
            this.classMap = ['decrease_sell', 'discount_sell', 'special_sell', 'invoice_sell', 'guarantee_sell'];
        },
        methods:{
            toggleFavorite(event) {//收藏
                if (!event._constructed) {
                    return;
                }
                this.favorite = !this.favorite;
                 saveToLocal(this.seller.id, 'favorite', this.favorite);
            },
            _initScroll() {//页面滚动效果
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.seller, {
                        click: true
                    });
                } else {//重新计算 scroll 执行滚动效果
                    this.scroll.refresh();
                }
            },
            _initPics() {//BScroll是需要子元素超出父元素宽高度才能滚动所以要计算ui的宽度
                if (this.seller.pics) {//判断是否有图片
                    let picWidth = 120;//每张图片的宽度
                    let margin = 6;//每张图片之间的margin
                    let width = (picWidth + margin) * this.seller.pics.length - margin;//图片款加上每张的margin值 最后一张没有margin
                    this.$refs.picList.style.width = width + 'px';//设置ul的宽度
                    this.$nextTick(() => {
                        //左右滚动效果
                        if (!this.picScroll) {
                            this.picScroll = new BScroll(this.$refs.picWrapper, {
                                scrollX: true,//横向滚动
                                eventPassthrough: 'vertical'
                            });
                        } else {
                            this.picScroll.refresh();
                        }
                    });
                }
            }
        },
        components:{
            star,
            split
        }
    };
</script>
<style scoped>
    .seller{
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
    }
    .seller  .overview{
        position: relative;
        padding: 18px;
    }
    .seller .overview .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
    }
    .seller .overview .desc{
        padding-bottom: 18px;
        border-bottom:1px solid rgba(7, 17, 27, 0.1);
        font-size: 0
    }
    .seller .overview .desc .star{
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
    }
    .seller .overview .desc .text{
        display: inline-block;
        margin-right: 12px;
        line-height: 18px;
        vertical-align: top;
        font-size: 10px;
        color: rgb(77, 85, 93);
    }
    .seller .overview .remark{
        display: flex;
        padding-top: 18px;
    }
    .seller .overview .remark .block{
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
    }
    .seller .overview .remark .block:last-child{
        border: none;
    }
    .seller .overview .remark .block h2{
        margin-bottom: 4px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .seller .overview .remark .block .content{
        line-height: 24px;
        font-size: 10px;
        color: rgb(7, 17, 27);
    }
    .seller .overview .remark .block .content .stress{
        font-size: 24px;
    }
    .seller .overview .favorite{
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
    }
    .active{
        color: red !important;
    }
    .seller .overview .favorite .fa-heart{
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;
    }
    .seller .overview .favorite .text{
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
    }
    .seller  .bulletin{
        padding: 18px 18px 0 18px;
    }
    .seller  .bulletin .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
    }
    .seller  .bulletin .content-wrapper{
        padding: 0 12px 16px 12px;
        border-bottom:1px solid rgba(7, 17, 27, 0.1);
    }
    .seller  .bulletin .content-wrapper .content{
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
    }
    .seller  .bulletin  .supports  .support-item{
        padding: 16px 12px;
        border-bottom:1px solid rgba(7, 17, 27, 0.1);
        font-size: 0;
    }
    .seller  .bulletin  .supports  .support-item:last-child{
        border:none;
    }
    .seller  .bulletin  .supports  .icon{
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-right: 6px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
    }
    .decrease_sell{
        background-image: url(decrease_4@2x.png);
     }
    .discount_sell{
        background-image: url(decrease_4@2x.png);
    }
    .guarantee_sell{
        background-image: url(guarantee_4@2x.png);
    }
    .invoice_sell{
        background-image: url(invoice_4@2x.png);
    }
    .special_sell{
        background-image: url(special_4@2x.png);
    }
    .seller  .bulletin  .supports .text{
        line-height: 16px;
        font-size: 12px;
        color: rgb(7, 17, 27);
    }
    .seller .pics{
        padding: 18px
    }
    .seller .pics .title{
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
    }
    .seller .pics .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }
    .seller .pics .pic-wrapper .pic-list{
        font-size: 0;
    }
    .seller .pics .pic-wrapper .pic-list  .pic-item{
        display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
    }
    .seller .pics .pic-wrapper .pic-list  .pic-item:last-child{
        margin: 0;
    }
    .seller .info{
        padding: 18px 18px 0 18px;
        color: rgb(7, 17, 27);
    }
    .seller .info .title{
        padding-bottom: 12px;
        line-height: 14px;
        border-bottom:1px solid rgba(7, 17, 27, 0.1);
        font-size: 14px;
    }
    .seller .info .title .info-item{
        padding: 16px 12px;
        line-height: 16px;
        border-bottom:1px solid rgba(7, 17, 27, 0.1);
        font-size: 12px;
    }
    .seller .info .title .info-item:last-child{
        border:none;
    }
</style>