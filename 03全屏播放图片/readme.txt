<!--
	1 一个showImg的盒子
    2 当盒子的父级是浏览器时，宽和高都是百分比时，一定要绝对定位
    ----------------------------------------------------
    3 juery:
      (1) hide() 隐藏
      (2) show() 显示，可带参（时间)
      (3) replace()将字符串替换想要的
      (4) attr() 两个参数时，是将后者赋给前者
      	  .css()
          .animate()
          渐变的动画效果：加一个css样式不透明度0，在一定时间变成不透明度为1
          .css("opacity",0).animate({"opacity":1},500);
      (5) 对于同胞元素如li要会利用索引index来找上一个、下一个
      	  eq() 同胞元素配合eq、配合index()来使用
本案例说明：小图是同胞li，大图只是一个。通过eq获得的是索引，对应的是同胞li。
      索引变化引起的是同胞li的变化，并不能引起大图的变化。
      思路是：先对应的小图li，在对应到大图
      （6） :last选择器 获得同胞元素的最后一个。如li:last
          $("li:last").index() 获得li的最后一个索引
      ----------------------------------------------------------
     4 自定义函数，并写出函数名调用。
     5 关于循环执行同一个动作，我的想法：
             function autoPlay(){
                _index++;
                alert("11");
                autoPlay();    //自己调用自己
             }
             autoPlay();
      事实上，用定时器就是循环执行（相当于while）：
      js有两个定时器，jq也有封装过的定时器
      说明：setInterval无限循环，但chrome中可能出问题；
           setTimeout执行一次，可以模拟serInterval
     6 重复使用的代码可以放在一个函数里。如play和pause的切换（本案例没有）
    

-->