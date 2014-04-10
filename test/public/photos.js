//���뼴ִ��
$(document).ready(function() {
		//���ط������򣬲���Jsonp����̨ʹ��node.js��ȡ����url��ֵ��������callback���ظ�ǰ̨
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
	
//1.�����ڷ���
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

	
	
	
//2.��ȾͼƬ
	function renderPhotos(rebuild,id,maxWidth,maxHeight){
		var imgDiv = $('#'+id);
		imgDiv.css({width:900,height:900});//��������Ҫ���160��5������5��div֮���Զ�������һ��
		console.log(rebuild);
		
		for(var key in rebuild){
		//������Ϊ����
			var p = $('<p/>');//pΪ�鼶Ԫ�ز�����imgԪ����ͬһ����
			p.text(key);
			imgDiv.append(p);
		//ѭ����ȾͼƬ
            for(var k in rebuild[key]){
				var photo = rebuild[key][k]['imageURL'];
				console.log(rebuild[key],rebuild[key][k]['imageURL']);
				
//				var div = $('<div/>');
//				div.css({width:160,height:160});
				
				var img = $('<img/>');//imgΪ����Ԫ�أ���ͬһ����ʾ
				img.css("width", maxWidth * 1); //�趨���ź����ʾ���  
				img.css("height", maxHeight * 1); //�趨���ź����ʾ�߶�
				
				img.attr("src", photo);
				//ע�⣬DOM�����jquery��������appendChild��append����
//				div.append(img);
				imgDiv.append(img);
			}
		}
	
	}
	
//3.��������
	function scrollAndRender(){
		var docH = $(document).height();//������ĸ߶�
        var winH = $(window).height();//ҳ���ĵ��ĸ߶�
        var scrollH = $(document).scrollTop();//�������������Ĵ�ֱ�߶�
        var height = docH - winH - scrollH;
		$(window).scroll(function(){
			if(height < 100){
				//1.��ȡnextURL(û������������ԣ��ҵ�url������node.js��̨��ȡ����)
				//2.renderPhotos
			}
		})
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	