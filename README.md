 ![image](https://github.com/wl001/vue2-elm/blob/master/images/elm.gif)
 
.
├── build                                       // webpack配置文件

├── config                                      // 项目打包路径

├── elm                                         // 上线项目文件，放在服务器即可正常访问

├── screenshots                                 // 项目截图
├── src                                         // 源码目录

│   ├── components                              // 组件

│   │   ├── common                              // 公共组件

│   │   │   ├── computeTime.vue                 // 倒计时组件

│   │   ├── footer

│   │   │   └── footGuide.vue                   // 底部公共组件

│   │   └── header

│   │       └── head.vue                        // 头部公共组件


.
> build

> config

> images

> src

>> assets

>> common/fonts

>> components

>> mock

>> router

>> App.vue

>> filter.js

>> main.js

> static

> .babelrc

> index.html

> package.json






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
