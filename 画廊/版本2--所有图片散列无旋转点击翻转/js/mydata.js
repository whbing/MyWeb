var data=[];
var dataStr='1、图片1的命名<br>\<br>\
图片1的描述<br>\<br>\<br>\
2、图片2的命名<br>\<br>\
图片2的描述<br>\<br>\<br>\
3、图片3的命名<br>\<br>\
图片3的描述<br>\<br>\<br>\
4、图片4的命名<br>\<br>\
图片4的描述<br>\<br>\<br>\
5、图片5的命名<br>\<br>\
图片5的描述<br>\<br>\<br>\
6、图片6的命名<br>\<br>\
图片6的描述<br>\<br>\<br>\
7、图片7的命名<br>\<br>\
图片7的描述<br>\<br>\<br>\
8、图片8的命名<br>\<br>\
图片8的描述<br>\<br>\<br>\
9、图片9的命名<br>\<br>\
图片9的描述<br>\<br>\<br>\
10、图片10的命名<br>\<br>\
图片10的描述<br>\<br>\<br>\
11、图片11命名<br>\<br>\
图片11的描述<br>\<br>\<br>\
12、图片12的命名<br>\<br>\
图片12的描述<br>\<br>\<br>\
13、图片13的命名<br>\<br>\
图片13的描述<br>\<br>\<br>\
14、图片14的命名<br>\<br>\
图片14的描述<br>\<br>\<br>\
15、图片15的命名<br>\<br>\
图片15的描述<br>\<br>\<br>\
16、图片16的命名<br>\<br>\
图片16的描述<br>';
	/*17、图片17的命名<br>\<br>\
	图片17的描述<br>\<br>\<br>\
	18、图片18的命名<br>\<br>\
	图片18的描述<br>\<br>\<br>\
	19、图片19的命名<br>\<br>\
	图片19的描述<br>\<br>\<br>\
	20、图片20的命名<br>\<br>\
	图片20的描述<br>';*/

var d=dataStr.split('<br><br><br>');    //三个<br>来分
for(var i=0;i<d.length;i++){
	var c=d[i].split('<br><br>');       //在每一个三个中，又按两个来分。c就是按两个分后的
	data.push({
		img:c[0].split('、')[0]+'.jpg',   //split()函数，分解完后是一个数组
		caption:c[0].split('、')[1],
		desc:c[1]
	
	});
	console.log(c[0].replace('、',' ')+'.jpg');
}
