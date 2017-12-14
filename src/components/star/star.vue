<template>
    <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item "></span>
    </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    props: {//接受父组件参数数据
      size:{
        type: Number
      },
      score:{
        type: Number
      }
    },
    computed:{//计算属性
      starType:function() {
        return 'star-'+this.size
      },
      itemClasses:function() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2 //分数
        let hasDecimal = score % 1 !== 0;//半星
        let integer = Math.floor(score);//全星
        for(let i = 0;i < integer; i++){
          result.push(CLS_ON)
        }
        if(hasDecimal){
          result.push(CLS_HALF)
        }
        while(result.length< LENGTH ){
          result.push(CLS_OFF)
        }
        return  result;
      }
    }
  }
</script>
<style>
  .star{
    font-size: 0;
  }
  .star .star-item{
    display: inline-block;
    background-repeat: no-repeat;

  }
   .star-48 .star-item{
    display: inline-block;
    width:20px;
    height:20px;
    margin-right: 22px;
    background-size:20px 20px ;
  }
  .star-48 .star-item:last-child{
    margin-right: 0;
  }
  .star-48 .on{
    background-image:url(star48_on@2x.png) ;
  }
  .star-48 .half{
    background-image:url(star48_half@2x.png) ;
  }
   .star-48 .off{
    background-image:url(star48_off@2x.png) ;
  }
  .star-36 .star-item{
    width:15px;
    height:15px;
    margin-right: 16px;
    background-size:15px 15px ;
  }
   .star-36  .on{
    background-image:url(star36_on@2x.png) ;
  }
  .star-36  .half{
    background-image:url(star36_half@2x.png) ;
  }
  .star-36  .off{
    background-image:url(star36_off@2x.png) ;
  }
   .star-24 .star-item{
    width:10px;
    height:10px;
    margin-right: 3px;
    background-size:10px 10px ;
  }
  .star-24 .on{
    background-image:url(star24_on@2x.png) ;
  }
  .star-24 .half{
    background-image:url(star24_half@2x.png) ;
  }
  .star-24 .off{
    background-image:url(star24_off@2x.png) ;
  }

</style>

