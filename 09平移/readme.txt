<!--原理：
    1 css3的动画两部曲：
      (1)     @keyframes play {
                   0%    {background-position: 0px bottom}
                   100%  {background-position: -1280px bottom}     /*这里设置和一张图片宽度一样*/
              }
      (2)    调用：animation: play 100s linear infinite;

-->