(function(){
	var dialog 	= document.getElementById("dialog");
	var dialogtitlebar 	= document.getElementById("dialogtitlebar");
	var dialogbody = document.getElementById("dialogbody");
	var dialogbody1	= document.getElementById("dialogbody1");
	var dialogtitle	= document.getElementById("dialogtitle");
	var dialogclose	= document.getElementById("dialogclose");
	var cancel = document.getElementById("cancel");
	
	dialogtitle.innerText = 'ddsd';
	dialogbody1.innerText = 'sdaf';
	
	var dialogleft = parseInt(dialog.style.left);
	var dialogtop = parseInt(dialog.style.top);
	var ismousedown = false;									//标志鼠标是否按下
										
	dialogclose.onclick = function(){
		dialog.style.display="none";
	}
	cancel.onclick = function(){
		dialog.style.display="none";
	}
		
	dialogtitlebar.onmousedown = function(e){
		ismousedown = true;
		downX = e.clientX;
		downY = e.clientY;
		
		document.onmousemove = function(e){
			if(ismousedown){
				dialog.style.left 	= e.clientX - downX + dialogleft + "px";
				dialog.style.top 	= e.clientY - downY + dialogtop + "px";
			}
		}
			
		document.onmouseup = function(){
			dialogleft 	= parseInt(dialog.style.left);
			dialogtop 	= parseInt(dialog.style.top);
			ismousedown = false;
		}
	}
})()