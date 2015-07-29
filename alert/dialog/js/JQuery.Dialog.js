/**
 * @author shitou 
 * qq shitouzxy@163.com
 * 
 * 调用  直接调用jdialog 的open 方法
 * option 
 *  Title :标题
 *  width :宽度 
 *  height :高度
 *  isDrag ：是否拖动
 *  isModal ：是否模态窗口
 *  fn： 执行函数
 */
var Jdialog = {

    // open
    
    open: function(options){
    
        var op = $.extend({
            Title: "窗口",
            Url: "null",
            width: "300",
            height: "300",
            isDrag: true,
			isModal:true,
            fn: null
        }, options);
        Jdialog.init(op.Title, op.Url, op.width, op.height, op.isDrag,op.isModal, op.fn);
    },
    
    //主函数
    init: function(Title, Url, width, height, isDrag,isModal, fn){
        var _shadow = 5;
        var _top = 30;
        var _bottom = 30;
        
        //获取客户端 屏幕的 高度，宽度
        var _clientWidth = document.body.clientWidth;
        var _clientHeight = document.documentElement.scrollHeight;
        	
		if(isModal){
			$("body").prepend('<div id="jdShadow">&nbsp;</div>');
			var shadow = $("#jdShadow");
			//shadow.css({width:_clientWidth+"px", height:_clientHeight+"px"});
		}
        
        //创建主容器
        if (typeof($("#jd_dialog") != "undefined")) {
            $("#jd_dialog").remove();
        }
        
        //设置位置
        
        $("body").prepend("<div id='jd_dialog'></div>");
        var _jdDialog = $("#jd_dialog");
        var _left = (_clientWidth - width) / 2;
        
        var _top = (_clientHeight - height) / 2;
        
        _jdDialog.css("left", _left + "px");
        
        _jdDialog.css("top", (_top < 0 ? 0 : _top) + "px");
        
        _jdDialog.css("width", width);
        
        _jdDialog.css("height", height);
        
        //创建标题栏头部
        _jdDialog.append("<div id='jd_dialog_h'></div>");
        
        var _dialogHeader = $("#jd_dialog_h");
        
		_dialogHeader.append('<span class="title">'+Title+'</span><span class="close">X</span>');
		
        //创建主窗体
        
        _jdDialog.append("<div id='jd_dialog_m'></div>");
	
        var _dialog = $("#jd_dialog_m");
        //设定高度
		var  mainHeight = height-60;
		_dialog.css("height",mainHeight+"px");
		
        //载入页面
        
        _dialog.load(Url);
        
        //插入底部
        _jdDialog.append("<div id='jd_dialog_b'></div>");
        
        var _jdDialogBottom = $("#jd_dialog_b");
        
        _jdDialogBottom.append('<span><input type="button" value="提交" id="dialogSubmit"/></span><span><input type="button" value="取消" id="dialogClose"/></span> ');
        
        var dialogSubmit = $("#dialogSubmit");
        var dialogClose = $("#dialogClose,#jd_dialog_h .close");
        dialogSubmit.click(fn);
        dialogClose.click(function(){
            Jdialog.close();
        });
        
        if (isDrag) {
            DragAndDrop.Register(_jdDialog, _dialogHeader);
        }
    },
    close: function(){
        $("#jd_dialog").remove();
		$("#jdShadow").remove();
    }
};

