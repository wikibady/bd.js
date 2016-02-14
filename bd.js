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
	var bfinish=true;
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
		if(cur!=json[attr])
		{
			bfinish=false;
		}
		if(bfinish)
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

function Ajax (url,fnSucess,fnFaild) {
	//创建ajax对象
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}

	//连接服务器
	oAjax.open('get',url,true);

	//发送请求
	oAjax.send();

	//接受返回
	oAjax.onreadystatechange=function()
	{
		//浏览器和服务器交互到第几步？
		if(oAjax.readyState==4)//读取完成
		{
			if(oAjax.status==200)//读取成功
			{
				fnSucess(oAjax.responseText);
			}
			else
			{
				if(fnFaild)
				{
					fnFaild(oAjax.status);
				}	
			}
		}
	}

}
