<!--商品评价组件-->
<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive" :class="{'active_all':selectType===2}">{{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span @click="select(0,$event)" class="block positive" :class="{'active_pos':selectType===0}">{{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span @click="select(1,$event)" class="block negative" :class="{'active_nega':selectType===1}" >{{desc.negative}}
                <span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div @click="toggleContent"  class="switch"  :class="{'on':onlyContent}">
            <span class=" fa fa-check-circle "></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    const POSITIVE = 0;//吐槽
    const NEGATIVE = 1;//满意
    const ALL = 2;//全部
    export default {
        props: {//接受父组件数据
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            }
        },
        computed: {
        //因为后台之给了ratings 可以有ratings.lengt
       // 但是没有一下的数据 需要计算属性判断rateType的值判断是都满意
            positives() {
                return this.ratings.filter((rating) => {
                    //rating.rateType = mock.js中的rateType
                    return rating.rateType === POSITIVE;
                });
            },
            negatives() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                });
            }
        },
        methods: {
            select(type, event) {
                if (!event._constructed) {
                    return;
                }
//                this.selectType = type;
                this.$emit('select', type);//更改父组件方法
            },
            toggleContent(event) {
                if (!event._constructed) {
                    return;
                }
                this.$emit('toggle');//更改父组件方法
            }
        }
    };
</script>
<style>
    .ratingselect .rating-type{
        padding: 18px 0;
        margin: 0 18px;
        border-bottom:1px solid rgba(7, 17, 27, 0.1);
        font-size: 0;
    }
    .ratingselect .rating-type .block{
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
    }
    .positive{
        background: rgba(0, 160, 220, 0.2)
    }
    .negative{
        background: rgba(77, 85, 93, 0.2)
    }
    .active_all{
        color: #fff !important;
        background: rgb(0, 160, 220);
    }
    .active_pos{
        background: rgb(0, 160, 220);
        color: #fff !important;
    }
    .active_nega{
        background: rgb(77, 85, 93);
        color: #fff !important;
    }
    .count{
        margin-left: 2px;
        font-size: 8px;
    }
    .switch{
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: rgb(147, 153, 159);
        font-size: 0;
    }
    .switch .fa-check-circle{
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
    }
    .on .fa-check-circle{
        color: #00c850;
    }
    .switch .text{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
    }


</style>
