//载入即执行
$(document).ready(function() {
		//本地访问他域，采用Jsonp，后台使用node.js获取他域url的值，并构造callback返回给前台
		$.ajax({
			 url:'http://127.0.0.1/',
			 type:'GET',
			//data:'',
			 dataType:'jsonp',
			 jsonpCallback:'callback',
			 success:function(data){
				var photos = data.photos;
				var rebuild = group(photos);
				renderPhotos(rebuild,'test',160,160);
			 },
			 error:function(){
				alert('fail!!!');
			 }
		});
	})
	
//1.按日期分组
	function group(photos) {
		var rebuild = {};
		for(var i=0;i<photos.length;i++){
			var d = new Date(photos[i]['time']);
			var formatDate = d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate();
			var value = rebuild[formatDate];
			if(!value){
				value = [];
				rebuild[formatDate] = value;
			}
			value.push(photos[i]);
		}
		return rebuild;
	}

	
	
	
//2.渲染图片
	function renderPhotos(rebuild,id,maxWidth,maxHeight){
		var imgDiv = $('#'+id);
		imgDiv.css({width:900,height:900});//正好是所要求的160的5倍，即5个div之后自动跳到下一行
		console.log(rebuild);
		
		for(var key in rebuild){
		//日期作为标题
			var p = $('<p/>');//p为块级元素不会与img元素在同一行内
			p.text(key);
			imgDiv.append(p);
		//循环渲染图片
            for(var k in rebuild[key]){
				var photo = rebuild[key][k]['imageURL'];
				console.log(rebuild[key],rebuild[key][k]['imageURL']);
				
//				var div = $('<div/>');
//				div.css({width:160,height:160});
				
				var img = $('<img/>');//img为内联元素，在同一行显示
				img.css("width", maxWidth * 1); //设定缩放后的显示宽度  
				img.css("height", maxHeight * 1); //设定缩放后的显示高度
				
				img.attr("src", photo);
				//注意，DOM对象和jquery对象区别，appendChild和append方法
//				div.append(img);
				imgDiv.append(img);
			}
		}
	
	}
	
//3.滚动加载
	function scrollAndRender(){
		var docH = $(document).height();//浏览器的高度
        var winH = $(window).height();//页面文档的高度
        var scrollH = $(document).scrollTop();//滚动条到顶部的垂直高度
        var height = docH - winH - scrollH;
		$(window).scroll(function(){
			if(height < 100){
				//1.获取nextURL(没看到有这个属性，我的url请求在node.js后台获取数据)
				//2.renderPhotos
			}
		})
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	