(function(){
	var Dialog = {
		/**
		*width:窗口的宽度，整数类型
		*height:窗口的高度，整数类型
		*bodycontent:窗口显示的内容,字符串类型，根据情况可以改写为DOM对象
		*title:窗口的标题，字符串类型
		*removeable:窗口是否能拖动，布尔类型
		*sureText：确定按钮的文字内容
		*cancelText：关闭按钮的文字内容
		*/
		show:function(width,height,bodycontent,title,sureText,cancelText,removeable){
			if(document.getElementById("6977402643848374753")==null){
				/*创建窗口的组成元素*/
				dialog 			= document.createElement("div");     //整个弹窗
				var dialogtitlebar 	= document.createElement("div");     //弹窗标题栏
				var dialogbody 		= document.createElement("div");     //显示弹窗内容的容器
				var dialogtitle 	= document.createElement("span");    //弹窗标题的容器
				var dialogclose 	= document.createElement("span");    //弹窗关闭按钮的容器
				var closeaction 	= document.createElement("button");  //弹窗按钮
				var content 	    = document.createElement("div");     //弹窗文字和按钮的容器
				var textContent     = document.createElement("div");     //弹窗文字的容器
				
				var buttonbody 		= document.createElement("div");     //按钮的容器
				var sureaction 	    = document.createElement("button");  //确定按钮
				var cancelaction    = document.createElement("button");  //取消按钮
				/*为窗口设置一个id，这么独特的id应该不会和用户重复吧，^_^*/
				dialog.id = "6977402643848374753";
				
				/*组装对话框标题栏,按从里到外的顺序组装*/
				closeaction.innerHTML = 'X';
				dialogtitle.innerHTML = title;
				dialogtitlebar.appendChild(dialogtitle);
				dialogtitlebar.appendChild(dialogclose);
				dialogclose.appendChild(closeaction);
				
				/*组装按钮和文字*/
				if(sureText == null || cancelText == null){
					sureaction.innerHTML = '确定';
					cancelaction.innerHTML = '取消';
				}else{
					sureaction.innerHTML = sureText;
					cancelaction.innerHTML = cancelText;
				}
				buttonbody.appendChild(sureaction);
				buttonbody.appendChild(cancelaction);
				content.appendChild(buttonbody);
				
				
				/*组装对话框文字内容*/
				if(bodycontent!=null){
					content.style.display = "block";
					
					textContent.innerHTML = bodycontent;
					dialogbody.appendChild(content);
					dialogbody.appendChild(textContent);
					//dialogbody.appendChild(content);
				}
				
				/*组装成完整的对话框*/
				dialog.appendChild(dialogtitlebar);
				dialog.appendChild(dialogbody);
				
				/*设置窗口组成元素的样式*/
				var templeft,temptop,tempheight;		//窗口的位置（将窗口放在页面中间的临时变量）
				var dialogcssText,dialogbodycssText;	//拼出dialog和dialogbody的样式字符串
				
				templeft = (document.body.clientWidth-width)/2;
				temptop = (document.body.clientHeight-height)/2;
				tempheight = height-30;	
				dialogcssText = "position:absolute;background:#ffffff;border:solid 3px #000000;top:"+
										temptop+"px;left:"+templeft+"px;height:"+height+"px;width:"+width+"px;";
				dialogbodycssText = "width:100%;background:#ffffff;"+"height:" + tempheight + "px;";
										
				dialog.style.cssText = dialogcssText;
				dialogtitlebar.style.cssText = "height:30px;width:100%;cursor:move;border:solid 1px #000000;";
				dialogbody.style.cssText = dialogbodycssText;
				dialogtitle.style.cssText = "font-size:16px;float:left;display:block;margin:4px;line-height:20px;";
				dialogclose.style.cssText = "float:right;display:block;margin:3px;line-height:20px;";
				closeaction.style.cssText = "height:20px;width:24px;border-width:1px;cursor:pointer;";
				
				content.style.cssText = "float:right;height:100px;width:150px;position:relative;";
				textContent.style.cssText = "margin-left:5px;";
				buttonbody.style.cssText = "height:30px;width:100%;cursor:move;margin-right:40px;position:absolute; right:0px; bottom:0px;";
				cancelaction.style.cssText = "height:20px;width:50px;border-width:1px;cursor:pointer;";
				sureaction.style.cssText = "height:20px;width:50px;border-width:1px;cursor:pointer;margin-right:5px;";
				
				/*为窗口元素注册事件*/
				var dialogleft 	= parseInt(dialog.style.left);
				var dialogtop 	= parseInt(dialog.style.top);
				var ismousedown = false;	//标记鼠标是否按下
				
				/*关闭X的事件*/							
				closeaction.onclick = function(){
					dialog.parentNode.removeChild(dialog);
				}
				/*取消按钮事件*/	
				cancelaction.onclick = function(){
					Dialog.hide();
				}
				/*确定按钮事件*/
				sureaction.onclick = function(){
					Dialog.hide();
				}
				
				/*实现窗口拖拽*/
				if(removeable == true){
					var ismousedown = false;
					var dialogleft,dialogtop;
					var downX,downY;
					
					dialogleft 	= parseInt(dialog.style.left);
					dialogtop 	= parseInt(dialog.style.top);
					
					dialogtitlebar.onmousedown = function(e){
						ismousedown = true;
						downX = e.clientX;
						downY = e.clientY;
					}
					
					document.onmousemove = function(e){
						if(ismousedown){
							dialog.style.top 	= e.clientY - downY + dialogtop + "px";
							dialog.style.left 	= e.clientX - downX + dialogleft + "px";
						}
					}
					/*松开鼠标时重新计算当前窗口的位置*/
					document.onmouseup = function(){
						dialogleft 	= parseInt(dialog.style.left);
						dialogtop 	= parseInt(dialog.style.top);
						ismousedown = false;
					}
				}
				return dialog;	
			}
		},
		
		hide:function(){
			dialog.parentNode.removeChild(dialog);
		}
	}
	
	//测试部分
	var here 		= document.getElementById("here");
	var clickhere 	= document.getElementById("clickhere");
	clickhere.onclick = function(){
		here.appendChild(Dialog.show(400,125,'提示内容',"系统提示","sure","cancel",true));
	}
})()