//1.控制翻转
function turn(elem) {
	var classname=elem.className;
	if(/photo_front/.test(classname)){
		classname=classname.replace(/photo_front/,"photo_back");	
	}else{
		classname=classname.replace(/photo_back/,"photo_front");
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
	
	for(s in data){
		var _html=template
						.replace('{{index}}',s)
						.replace('{{img}}',data[s].img)
						.replace('{{caption}}',data[s].caption)
						.replace('{{desc}}',data[s].desc);
		html.push(_html);		
	}
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
	var _photo=g('.photo');   //临时用的很少的变量前边加一个_
	var photos=[];            //数组，将所有海报变成数组装进photo里
	for(s=0;s<_photo.length;s++){
		_photo[s].className=_photo[s].className.replace(/\s*photo_center\s*/,' ');
		photos.push(_photo[s]);
	}
	
	var photo_center=g('#photo_'+n);
	photo_center.className += ' photo_center'; //给样式加一个photo_center样式
	
	photo_center=photos.splice(n,1)[0];    //此时的photo切了一个，长度少了一个
	
	//把剩余的photos分成左右
	var photos_left = photos.splice(0,Math.ceil(photos.length/2));
	var photos_right= photos;     //剩下的就是right
	console.log(photos_left.length,photos_right.length);
	
	//左右两部分随机位子显示
	var ranges=range();
	for(s=0;s<photos_left.length;s++){
		var photo=photos_left[s];
		
		photo.style.left=random((ranges.left.x))+'px';
		photo.style.top= random((ranges.left.y))+'px';
	}
	for(s=0;s<photos_right.length;s++){
		var photo=photos_right[s];
		
		photo.style.left=random((ranges.right.x))+'px';   //左边图片的左边，从左边算
		photo.style.top= random((ranges.right.y))+'px';
	}
}