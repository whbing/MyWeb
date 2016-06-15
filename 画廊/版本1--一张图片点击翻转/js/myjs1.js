function turn(elem) {
	var classname=elem.className;
	if(/photo_front/.test(classname)){
		classname=classname.replace(/photo_front/,"photo_back");	
	}else{
		classname=classname.replace(/photo_back/,"photo_front");
	}
	return elem.className=classname;
}