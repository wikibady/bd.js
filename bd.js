function getByClass(oParent,sClass)
{
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];

	for(var i = 0;i < aEle.length;i++)
	{
		if(aEle[i].className == sClass)
		{
			aResult.push(aEle[i])
		}
	}
	return aResult;
}
function getStyle(obj,name) {
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,false)[name];
	}
}
function startMove(obj,json,fnFunction) {
	clearInterval(obj.timer);

	obj.timer=setInterval(function () {
		for(attr in json)
		{
			var cur=0;
		if(attr=='opacity')
		{
			cur=parseFloat(getStyle(obj,attr))*100;
		}
		else
		{
			cur=parseInt(getStyle(obj,attr));
		}
		var speed=(json[attr]-cur)/10;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur==json[attr])
		{
			clearInterval(obj.timer);
			if(fnFunction)
			{
				fnFunction();
			}
		}
		else
		{
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+cur+speed+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}

		}
		
	},30);
}
