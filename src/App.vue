<template>
  <div id="app">
    <Header_ :seller="seller"></Header_>
    <div class="tab">
      <router-link class="tab-item" to="/goods" tag="li" active-class="active">
        <a  href="javascript:;">商品</a>
      </router-link>
      <router-link class="tab-item" to="/ratings" tag="li" active-class="active">
        <a  href="javascript:;">评论</a>
      </router-link>
      <router-link class="tab-item" to="/seller" tag="li" active-class="active">
        <a  href="javascript:;">商家</a>
      </router-link>
    </div>
    <div>
        <keep-alive>
            <!--:seller="seller" 向子组件传递数据-->
            <router-view :seller="seller"></router-view>
        </keep-alive>
    </div>

    <!--<div class="footer">1</div>-->
  </div>
</template>
<script type="text/ecmascript-6">
import Header_ from './components/header/header.vue'
import { urlParse } from './filter';
export default {
  data() {
    return {
      seller:{
        id: (() => {//拿到url中的参数
          let queryParam = urlParse();
          console.log(queryParam)
          return queryParam.id;
        })()
      },
    }
  },
  mounted(){
      //'seller?id='+ this.seller.id
    this.$http.get('seller').then(function(data){
      console.log( data.body)////需要这样获取到数组 Object格式
        //给对象扩展属性的方法Object.assign()
       this.seller = Object.assign({}, this.seller, data.data);
        console.log('app.vue'+ '-'+ 'url.id'+ '-'+ this.seller.id)
    }).catch(function(err){
      console.log(err);
    });
  },
  components:{
    Header_
  },
  name: 'app'
}
</script>

<style>
  .tab{
    display: flex;
    width:100%;
    height:40px;
    line-height: 40px;
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .tab .tab-item a{
    display: block;
    font-size: 14px;
    color:rgb(77,85,93)
  }
  .tab .tab-item.active a{
    color:rgb(240,20,20)
  }


</style>
