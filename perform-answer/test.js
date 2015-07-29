/**
*猪八戒前端笔试题
*Author: pc
*Date: 14-5-20
*/

//这种匿名函数开头的写法可以有效防止对象或方法全局化。
(function(){

	var PhotoLayout = {
		/**将Number转换为Date并且格式化为"YYYY-MM-DD"
		*param/datetime 时间毫秒数
		*return 返回"YYYY-MM-DD"日期格式
		*/
		time2Date:function(datetime){
			var date = new Date(datetime);
			return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(); 
		},
		/**
		*将json数据以天为key进行分组
		*param/photos 图片的json数据
		*return 返回以天分组的图片信息的新json
		*/
		group:function(photos){
			var jsonObject = {};
			for(var i = 0;i < photos.length;i++){
				var tempDate = PhotoLayout.time2Date(photos[i].time);
				var jsonArray = jsonObject[tempDate];
				if(!jsonArray){
					jsonArray = [];
					jsonObject[tempDate] = jsonArray;
				}
				jsonArray.push(photos[i]);
			}
			return jsonObject;
		},
		/**
		 * 从URL获取图片的json数据（以JSONP来解决跨域问题）
		 *params/url 数据源地址
		 *params/callback 回调函数
		 */
		getPhotos : function(url, callback){
			//判断url中是否存在?,进而拼接回调函数参数
			if(url.indexOf('?') != -1){
				url += "&callback=?";
			}else{
				url += "?callback=?";
			}
			//采用jquery的jsonp实现
			jQuery.getJSON(url,function(p){
				var param = {
					'list':PhotoLayout.group(p.photos),
					'nextURL':p.nextURL
				}
				callback(param);
			});
		},
		/**
		*布局并渲染图片
		*param/p 按天分组的json数据
		*/
		renderAndLayout:function(p){
			//加载图片出错的占位图片
			var errPic = "error.png";
			var html = "";//整个页面顶部DIV
			for(var i in p){//p为按天分组的json串，i为以天为key的子串
				var list = "";//图片列表
				for(var j in p[i]){
					var clear = (parseInt(j)%5 == 0) ? "class='clear'" : "";
					var photo = p[i][j];
					var photoFrame = PhotoLayout.scalePhoto(photo.width,photo.height,160,160);
					list += '<li ' + clear + '>' +
								'<div style="width:' + photoFrame.w + 'px;height:' + photoFrame.h + 'px;margin-top:' + photoFrame.mt + 'px;margin-left:' + photoFrame.ml +'px;">' +
									'<img src="' + photo.imageURL + '" style="width:' + photoFrame.w + 'px;height:' + photoFrame.h + 'px;" onerror="this.src=\'' + errPic + '\'"/>'+
								'</div>' + 
							'</li>';
				}
				html += '<div>' +
							'<h2>' + i +'</h2>' +
							'<ul>' + list + '</ul>' +
						'</div>';
				list = "";
			}
			jQuery(".wrap").append(html);
		},
		/**
		 * 缩放图片并居中
		 *param/initWidth 图片原始宽度
		 *param/initHeight 图片原始高度
		 *param/scaleWidth 缩放要求宽度
		 *param/scaleHeight 缩放要求高度
		 *return 缩放后，包含宽高，顶部外边距和左边外边距的对象,其中w+2*mt等于scaleWidth,h+2*ml等于scaleHeight
		 */
		scalePhoto : function(initWidth,initHeight,scaleWidth,scaleHeight){
			var width,height,margin_top,margin_left;
			//原始宽度大于 缩放要求宽度
			if(initWidth > scaleWidth){
				//压缩宽度并按面积缩小高度
				width = scaleWidth;
				height = (width * initHeight)/initWidth;
				//压缩后的高度还是大于 缩放要求高度
				if(height > scaleHeight){
					width = (scaleHeight * width)/height;
					height = scaleHeight;
					margin_top = 0;
					margin_left = (scaleWidth - width)/2;
				}else{////压缩后的高度还是小于 缩放要求高度
					margin_left = 0;
					margin_top = (scaleHeight - height)/2
				}
			}else{
				if(initHeight > scaleHeight){
					//宽度不变，压缩高度
					width = scaleHeight * initWidth/initHeight;
					height = scaleHeight;
					margin_top = 0;
					margin_left = (scaleWidth - width)/2
				}else{
					//水平居中，垂直居中
					width = initHeight;
					height = initHeight;
					margin_top = (scaleHeight - initHeight)/2;
					margin_left = (scaleWidth - initWidth)/2;
				}
			}
			return {w:width,h:height,mt:margin_top,ml:margin_left}
		},
		scrollLoad:function(){
			var docHeight = jQuery(document).height();//整个Html文档的高度
			var winHeight = jQuery(window).height();//浏览器window的显示高度
			var scrollTopH = jQuery(document).scrollTop();//滚动条与页面顶部高度
			var h = docHeight - scrollTopH - winHeight;//剩余Html文档的高度

			if(h < 100){
				PhotoLayout.getPhotos(nextUrl,function(p){
					nextUrl = p.nextURL;
					PhotoLayout.renderAndLayout(p.list);
				})
			}
		}
	}
var nextUrl = '';
//程序入口
jQuery(function(){
	//第一次获取图片
	initURL = "http://photo-sync.herokuapp.com/photos";
	PhotoLayout.getPhotos(initURL,function(p){
		nextUrl = p.nextURL;
		PhotoLayout.renderAndLayout(p.list);
	});
	
	//绑定滚动事件
	jQuery(window).bind('scroll',PhotoLayout.scrollLoad);
})
	
})()




