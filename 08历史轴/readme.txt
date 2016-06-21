<!--原理：
    1 左边导航的圆点实际上是背景图片
      一个li左边留有空间，正好显示这个图片
    2 小空心圆点变色实际上是两张图片，一张透明的，一张有色的；当加样式时，就显示有色的
      整个透明的圆点是加在left-nav上在，而每个有色的图片是加在li上的，结合3中所说微调
    3 background:url("img/nav_cur.png") no-repeat 0px 0px;后边两个表示背景图的坐标，可微调
    4 background:url("img/1.jpg") center  fixed;
    ------------------------------------------------------------------
    5 jquery：
      (1) var n=parseInt($(window).scrollTop()/$(window).height());
            /* n为滚动距离占屏幕比例
             * 当滚动的距离不到浏览器高度 n为0
             * 当超过一个高，比例即为 1.几，转化后为1
             * 以此类推
            */
      (2) $("#left-nav ul li").eq(n).addClass("current").siblings().removeClass("current");

     小结：本次项目犯的错误：每个li都写在ul中，导致li无兄弟节点siblings
-->