//1.控制翻转
function turn(elem) {
	var classname=elem.className;
	var n = elem.id.split('_')[1];
	
	//当点击的是非当前选中海报的按钮时，做一次重新排序，并将当前的按钮设为选中
	//如果点中的是按钮,得到也是#photo_n的那个div，因为按钮的turn指的是另外的元素
	if(!/photo_center/.test(classname)){
		classname += ' photo_center';
		resort(n);
		return elem.className=classname;
	}
	
	if(/photo_front/.test(classname)){
		classname=classname.replace(/photo_front/,"photo_back");
		g('#nav_'+n).className=g('#nav_'+n).className.replace(/i_current/,'i_back');	
	}else{
		classname=classname.replace(/photo_back/,"photo_front");
	  	g('#nav_'+n).className = g('#nav_'+n).className.replace(/i_back/,'i_current');
	}
	return elem.className=classname;
}

//2.改变html的视图，在html中完成
//3.通用函数,通过class或id将整段的文档内容都获得
function g(selector){
	//substr(0,1)函数表示从第0起（第一个字母），往后取1个
	var method=selector.substr(0,1)=='.'?'getElementsByClassName':'getElementById';
	//return document.getElementById(selector);//这样的话直接g("wrap")就按id选了
	/*根据.获取的返回时数组[]，
	  根据#获取的返回单一的*/
	return document[method](selector.substr(1)); 
}
//4.输出所有的海报
var data=data;
function addPhotos(){
	
	var template=g('#wrap').innerHTML;
	var html=[];
	var nav =[];  //用于输出导航
	
	for(s in data){
		var _html=template
						.replace('{{index}}',s)
						.replace('{{img}}',data[s].img)
						.replace('{{caption}}',data[s].caption)
						.replace('{{desc}}',data[s].desc);
		html.push(_html);	
		
		nav.push('<span id="nav_'+s+'" onclick="turn( g(\'#photo_'+s+'\') )" class="i"><span class="mycons glyphicon glyphicon-heart-empty"></span></span>');	
	}
	html.push('<div class="nav">'+nav.join('')+'</div>');
	//console.log(g('#wrap'));
	//console.log(html);
	g('#wrap').innerHTML=html.join('');
	resort(random([0,data.length]));    //16张图片时，photo_id是[0,15],对应图片1~16
}
//console.log("1");
//console.log(g('#wrap'));
addPhotos();                       //特别注意：源html引用js时，要先引用存储数据的js文件
						//添加图片的时候还需要排序


//随机生成一个数字，在给定的范围内生成数字rangdom([min,max])形式
function random(range){
	var max=Math.max(range[0],range[1]);
	var min=Math.min(range[0],range[1]);
	//var num=Math.ceil(Math.random()*(max-min)+min);  //原来是向上取整
	var num=Math.floor(Math.random()*(max-min)+min);  
	return num;
}


//6.计算左右分区的范围,对象{属性1:值,属性2:值...} 用 对象.属性 调用
function range(){
	var range={left:{x:[],y:[]}, right:{x:[],y:[]}};   //这里是多重对象
	
	var wrap={
		w:g('#wrap').clientWidth,
		h:g('#wrap').clientHeight
	}
	var photo={
		w:g('.photo')[0].clientWidth,
		h:g('.photo')[0].clientHeight	
	}
	range.wrap=wrap;
	range.photo=photo;
	
	range.left.x=[0-photo.w, wrap.w/2-photo.w/2];
	range.left.y=[0-photo.h, wrap.h];
	range.right.x=[wrap.w/2+photo.w/2, wrap.w];  //右边的图片也从左边算
	range.right.y=[0-photo.h, wrap.h];
	return range;     //返回结果：Object {left: Object, right: Object}
		/*返回结果：Object {left: Object, right: Object, wrap: Object, photo: Object}
		           		left: Object
				   			x: Array[0]
							y: Array[0]
						right: Object
							x: Array[0]
							y: Array[0]
						photo: Object
							h: 320
							w: 260
						wrap: Object
							h: 600
							w: 533
					*/
}


//5.排序海报
function resort(n){
	//1.先给出了选中的之外的海报，去掉center操作。所有去掉即可
	//以及去掉所有的角度样式
	var _photo=g('.photo');   //临时用的很少的变量前边加一个_
	var photos=[];            //数组，将所有海报变成数组装进photo里
	for(s=0;s<_photo.length;s++){
		_photo[s].className=_photo[s].className.replace(/\s*photo_center\s*/,' ');
		_photo[s].className=_photo[s].className.replace(/\s*photo_front\s*/,' ');
		_photo[s].className=_photo[s].className.replace(/\s*photo_back\s*/,' ');	
		
		//初始让所有照片都在前面
		_photo[s].className += ' photo_front';	
	
		_photo[s].style.left='';
		_photo[s].style.top='';
		
		//重新排序时，可以将角度置零。我们改为360度。
		_photo[s].style['transform']='rotate(360deg) scale(1)';
		_photo[s].style['-webkit-transform']='rotate(360deg) scale(1)';
		_photo[s].style['-ms-transform']='rotate(360deg) scale(1)';
		_photo[s].style['-moz-transform']='rotate(360deg) scale(1)';
		_photo[s].style['-o-transform']='rotate(360deg) scale(1)';
		
		photos.push(_photo[s]);
	}
	
	var photo_center=g('#photo_'+n);
	
	photo_center.style['transform']='rotate(360deg) scale(1.3)';
	photo_center.style['-ms-transform']='rotate(360deg) scale(1.3)';
	photo_center.style['-moz-transform']='rotate(360deg) scale(1.3)';	
	photo_center.style['-webkit-transform']='rotate(360deg) scale(1.3)';
	photo_center.style['-o-transform']='rotate(360deg) scale(1.3)';

	photo_center.className += ' photo_center'; 
					//给样式加一个photo_center样式
	photo_center=photos.splice(n,1)[0];    //此时的photo切了一个，长度少了一个
	
	//把剩余的photos分成左右
	var photos_left = photos.splice(0,Math.ceil(photos.length/2));
	var photos_right= photos;     //剩下的就是right
	
	//左右两部分随机位子显示
	//在随机位子的同时，还要给一个随机角度旋转
	var ranges=range();
	for(s=0;s<photos_left.length;s++){
		var photo=photos_left[s];
		
		photo.style.left=random((ranges.left.x))+'px';
		photo.style.top= random((ranges.left.y))+'px';
		
		//添加一个随机角度
		photo.style['transform']='rotate('+random([-150,150])+'deg)';
		photo.style['-ms-transform']='rotate('+random([-150,150])+'deg)';
		photo.style['-webkit-transform']='rotate('+random([-150,150])+'deg)';
		photo.style['-moz-transform']='rotate('+random([-150,150])+'deg)';
		photo.style['-o-transform']='rotate('+random([-150,150])+'deg)';
	}
	for(s=0;s<photos_right.length;s++){
		var photo=photos_right[s];
		
		photo.style.left=random((ranges.right.x))+'px';   //左边图片的左边，从左边算
		photo.style.top= random((ranges.right.y))+'px';
		
		//添加一个随机角度
		photo.style['transform']='rotate('+random([-150,150])+'deg)';
		photo.style['-webkit-transform']='rotate('+random([-150,150])+'deg)';
		photo.style['-ms-transform']='rotate('+random([-150,150])+'deg)';
		photo.style['-moz-transform']='rotate('+random([-150,150])+'deg)';
		photo.style['-o-transform']='rotate('+random([-150,150])+'deg)';
	}
	
	//按钮。在做排序时，先去除所有i_current和i_back样式。再给当前的样式选中加i_current样式
	var navs=g('.i');
	for(s=0;s<navs.length;s++){
		navs[s].className = navs[s].className.replace(/\s*i_current\s*/,' ');
		navs[s].className = navs[s].className.replace(/\s*i_back\s*/,' ');
	}
	g('#nav_'+n).className += ' i_current';
}