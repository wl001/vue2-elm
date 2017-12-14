<!--评价页面-->
<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <!--综合评分-->
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <!--综合评分-->
            <split></split>
            <!--评论组件-->
            <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
            <!--评论组件-->
            <!--评论列表-->
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span :class="{'fa fa-thumbs-up':rating.rateType===0,'fa fa-thumbs-down':rating.rateType===1}"></span>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--评论列表-->
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import star from '../star/star.vue';
    import split from '../split/split.vue'//分割线
    import ratingselect from '../ratingselect/ratingselect.vue'//商品评价组件
    import {formatDate} from '../../filter';

    const POSITIVE = 0;//吐槽
    const NEGATIVE = 1;//满意
    const ALL = 2;//全部

    export default {
        data(){
            return{
                ratings: [],
                selectType: ALL,
                onlyContent: true,
            }
        },
        //接受父组件数据
        props: {
            seller: {
                type: Object
            }
        },
        methods:{
            //筛选  根据类型不同显示不同的信息
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            },
            //选择的类型
            selectRating(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent;
                //重新计算滚动值
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            }
        },
        //自定义过滤器
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        //依赖组件
        components: {
            star,
            split,
            ratingselect
        },
        created() {//读取后台数据
            this.$http.get('ratings').then(function(data){
                this.ratings = data.body;
                //判断dom结构是否完全加载 this.$nextTick(() => {}) 保证dom渲染完毕
                this.$nextTick(() => {
                    //找到$refs.ratings的dom 该区域滚动效果
                    this.scroll = new BScroll(this.$refs.ratings, {
                        click: true
                    });
                });
            },function(){
                console.log('数据请求错误')
            })
        }
    };
</script>
<style scoped>
    .ratings{
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
    }
    .ratings .overview{
        display: flex;
        padding: 18px 0;
    }
     .overview-left{
        flex: 0 0 137px;
        padding: 6px 0;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
    }
    .overview-left .score{
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0)
    }
    .overview-left .title{
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27)
    }

    .overview-left .rank{
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
     .overview-right{
        flex: 1;
        padding: 6px 0 6px 24px;
    }
    .overview-right .score-wrapper{
        margin-bottom: 8px;
        font-size: 0;
    }
    .overview-right .score-wrapper .title{
        display: inline-block;
        line-height: 18px;
        vertical-align: top;
        font-size: 12px;
        color: rgb(7, 17, 27);
    }
  .overview-right .score-wrapper .star{
        display: inline-block;
        margin: 0 12px;
        vertical-align: top;
    }
     .overview-right .score-wrapper .score{
        display: inline-block;
        line-height: 18px;
        vertical-align: top;
        font-size: 12px;
        color: rgb(255, 153, 0);
    }
     .overview-right .score-wrapper .delivery-wrapper{
        font-size: 0
    }
     .overview-right .score-wrapper .delivery-wrapper .title{
        line-height: 18px;
        font-size: 12px;
        color: rgb(7, 17, 27);
    }
     .overview-right .score-wrapper .delivery-wrapper .delivery{
        margin-left: 12px;
        font-size: 12px;
        color: rgb(147, 153, 159);
    }
     .rating-wrapper{
         padding: 0 18px;
     }
    .rating-wrapper  .rating-item{
        display: flex;
        padding: 18px 0;
        border-bottom:1px solid rgba(7, 17, 27, 0.1);
    }
    .rating-wrapper  .rating-item .avatar{
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
    }
    .rating-wrapper  .rating-item .avatar img{
        border-radius: 50%;
    }
    .rating-wrapper  .rating-item .content{
        position: relative;
        flex: 1;
    }
    .rating-wrapper  .rating-item .content .name{
        margin-bottom: 4px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(7, 17, 27);
    }
    .rating-wrapper  .rating-item .content .star-wrapper{
        margin-bottom: 6px;
        font-size: 0;
    }
    .rating-wrapper  .rating-item .content .star-wrapper .star{
        display: inline-block;
        margin-right: 6px;
        vertical-align: top;
    }
    .rating-wrapper  .rating-item .content .star-wrapper .delivery{
        display: inline-block;
        vertical-align: top;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .rating-wrapper  .rating-item .content .text{
        margin-bottom: 8px;
        line-height: 18px;
        color: rgb(7, 17, 27);
        font-size: 12px;
    }
    .rating-wrapper  .rating-item .content .recommend{
        line-height: 16px;
        font-size: 0;
    }
    .rating-wrapper  .rating-item .content .recommend .fa-thumbs-up{
        display: inline-block;
        margin: 0 8px 4px 0;
        font-size: 9px;
        color: rgb(0, 160, 220);
    }
    .rating-wrapper  .rating-item .content .recommend .fa-thumbs-down{
        margin-right: 4px;
        line-height: 16px;
        font-size: 12px;
        color: rgb(147, 153, 159)
    }
    .rating-wrapper  .rating-item .content .recommend  .item{
        display: inline-block;
        margin: 0 8px 4px 0;
        font-size: 9px;
        padding: 0 6px;
        border: 1px solid rgba(7, 17, 27, 0.1);
        border-radius: 1px;
        color: rgb(147, 153, 159);
        background: #fff;
    }
    .rating-wrapper  .rating-item .content .time{
        position: absolute;
        top: 0;
        right: 0;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    @media only screen and (max-width: 320px){
        .overview-left{
            flex: 0 0 120px;
            width: 120px;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            text-align: center;
        }
        .overview-right{
            flex: 1;
            padding: 6px 0 6px 6px !important;
        }
        .overview-right .score-wrapper .star{
            display: inline-block;
            margin: 0 0 0 6px !important;
            vertical-align: top;
        }
    }
</style>