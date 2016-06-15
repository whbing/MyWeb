<!--
	1.构造有宽度的盒子<div class="logo"></div>,宽度100%,使之铺满
      给导航条加边框border，如border和margin都有top left right bottom之分
    2.span标签设置display:block设置为块级元素。
      里面的文字字体，大小都用font控制
    3.增加内上边距实现居中，注意这时要调整盒子的高度
    4.给每个li之间添加小竖线，实际上是添加背景图片。
      css添加背景图片的方法background:url("") no-repeat right center效果
	---------------------------------------------------------
    5.li的基本样式是一样的。但是鼠标放在当前li上颜色不一样。这时我们就要把<br>
	  其中一个加上一个特定的class，比如.hover
    6.二级菜单就是在li标签里再写盒子
  知识点：(1) li的二级菜单在li下方显现出来，涉及“绝对定位”
  		 (2) 由于二级菜单在li里，我们给li加"相对定位"：li本来的定位
         (3) 给二级菜单加“绝对定位”，就找到了li。通过top等调整
    7.二级菜单里可以放图片
    ----------------------------------------------------------
    8.引入jquery制作动画
     (1) 对象.addClass("name") 添加一个名为name的样式
	 (2) 对象.siblings()       还是返回对象|无参时所有同胞对象（不含本身）；
                                         有参时，该对象里的选择性所有对象
     (3) 对象.removeClass()    移除class
     (4) $(selector).hover(inFunction,outFunction)鼠标移入和移出
     (5) show()、slidedDown()、slideUp()都可起显示元素的作用，可传时间参数
     (6)
-->