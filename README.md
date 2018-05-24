# eleme-demo

> A Vue.js project

## Build Setup

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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 遇到的难点
如何实现左右两列滑块相互对应： 点击左列 滚动到指定元素   点击右列，通过判断滚动出去的高度
在mounted生命周期函数中获取DOM元素的高度时，居然为空，设置setTimeout后解决
在mounted函数中进行BScroll的实例化
小球抛物线运动： 外层元素X轴匀速运动 小球Y轴贝塞尔曲线运动
在不同分辨率设备中  购物车小图标的位置不一样 所以小球运动的最终位置不能写死，通过动态获取小球与购物车的位置来实现，（getBoundingClientRect()）
购物车部分：数据关联度较高 将相关数据存储进全局store中，围绕store中的数据展开业务逻辑
goods右侧菜品栏中的加减控制按钮与菜品详细页的控制按钮业务逻辑一致
在一个组件中如果有多个BScroll实例  注意tap设置一次就好了 否则会出问题
全部 推荐 吐槽筛选部分  通过定义一个计算属性根据state中定义的某个值来判断返回数组，state中的值的改变通过点击全部 推荐 吐槽按钮来实现
购物车详细列表以及遮层显示与隐藏也有些细节需要注意
最后就是一些细节上的问题  事件冒泡；定位的上下层覆盖；BScroll滚动必须的结构，滚动的盒子必须比外层盒子高/宽

