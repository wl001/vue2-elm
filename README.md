#### 项目目录
``` bash
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── images                                      // 示例图片 
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── cartcontrol                         // 购买商品的按钮组件          
│   │   │   ├── cartcontrol.vue          
│   │   ├── food                                // 点击商品出现商品详情页组件
│   │   │   └── food.vue  
│   │   ├── goods                               // 商品页面组建
│   │   │   └── goods.vue                  
│   │   ├── header 
│   │   │   └── header.vue                      // 头部组件
│   │   ├── ratings
│   │   │   └── ratings.vue                     // 评价页面组件
│   │   ├── ratingselect
│   │   │   └── ratingselect.vue                // 商品评价组件
│   │   ├── seller
│   │   │   └── seller.vue                      // 商家页面组件
│   │   ├── shopcart
│   │   │   └── shopcart.vue                    // 购物车组件
│   │   ├── split
│   │   │   └── split.vue                       // 分割线组件
│   │   └── star
│   │       └── star.vue                        // 星级评分组件
│   ├── mock
│   │   ├── mock.js                             // 模拟数据
│   ├── router                                  // 路由配置
│   │   ├── index.js                             
│   ├── App.vue                                 // 页面入口文件
│   ├── filter.js                               // 自定义过滤器和js封装存储库
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── static                                      // 静态资源文件
├── index.html                                  // 入口html文件
```

#### 技术栈
> 用webpack搭建的脚手架配合vue2和路由router、ES6语法、flex布局、axios数据交互、mock前后端数据分离构建的几个页面和功能

#### 项目运行
 ![image](https://github.com/wl001/vue2-elm/blob/master/images/elm.gif)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
 
# build for production and view the bundle analyzer report
npm run build --report
```			

