/**
 * @author Administrator
 */

var DragAndDrop = function(){

    //客户端当前屏幕尺寸(忽略滚动条)
    var _clientWidth;
    var _clientHeight;
    
    //拖拽控制区
    var _controlObj;
    //拖拽对象
    var _dragObj;
    //拖动状态
    var _flag = false;
    
    //拖拽对象的当前位置
    var _dragObjCurrentLocation;
    
    //鼠标最后位置
    var _mouseLastLocation;
    
    //使用异步的Javascript使拖拽效果更为流畅
    //var _timer;
    
    //定时移动，由_timer定时调用
    //var intervalMove = function(){
    //	$(_dragObj).css("left", _dragObjCurrentLocation.x + "px");
    //	$(_dragObj).css("top", _dragObjCurrentLocation.y + "px");
    //};
    
    var getElementDocument = function(element){
        return element.ownerDocument || element.document;
    };
    
    //鼠标按下
    var dragMouseDownHandler = function(evt){
    
        if (_dragObj) {
        
            evt = evt || window.event;
            
            //获取客户端屏幕尺寸
            _clientWidth = document.body.clientWidth;
            _clientHeight = document.documentElement.scrollHeight;
            
            //iframe遮罩
            $("#jd_dialog_m_b_1").css("display", "");
            
            //标记
            _flag = true;
            
            //拖拽对象位置初始化
            _dragObjCurrentLocation = {
                x: $(_dragObj).offset().left,
                y: $(_dragObj).offset().top
            };
            
            //鼠标最后位置初始化
            _mouseLastLocation = {
                x: evt.screenX,
                y: evt.screenY
            };
            
            //注：mousemove与mouseup下件均针对document注册，以解决鼠标离开_controlObj时事件丢失问题
            //注册事件(鼠标移动)			
            $(document).bind("mousemove", dragMouseMoveHandler);
            //注册事件(鼠标松开)
            $(document).bind("mouseup", dragMouseUpHandler);
            
            //取消事件的默认动作
            if (evt.preventDefault) 
                evt.preventDefault();
            else 
                evt.returnValue = false;
            
            //开启异步移动
            //_timer = setInterval(intervalMove, 10);
        }
    };
    
    //鼠标移动
    var dragMouseMoveHandler = function(evt){
        if (_flag) {
        
            evt = evt || window.event;
            
            //当前鼠标的x,y座标
            var _mouseCurrentLocation = {
                x: evt.screenX,
                y: evt.screenY
            };
            
            //拖拽对象座标更新(变量)
            _dragObjCurrentLocation.x = _dragObjCurrentLocation.x + (_mouseCurrentLocation.x - _mouseLastLocation.x);
            _dragObjCurrentLocation.y = _dragObjCurrentLocation.y + (_mouseCurrentLocation.y - _mouseLastLocation.y);
            
            //将鼠标最后位置赋值为当前位置
            _mouseLastLocation = _mouseCurrentLocation;
            
            //拖拽对象座标更新(位置)
            $(_dragObj).css("left", _dragObjCurrentLocation.x + "px");
            $(_dragObj).css("top", _dragObjCurrentLocation.y + "px");
            
            //取消事件的默认动作
            if (evt.preventDefault) 
                evt.preventDefault();
            else 
                evt.returnValue = false;
        }
    };
    
    //鼠标松开
    var dragMouseUpHandler = function(evt){
        if (_flag) {
            evt = evt || window.event;
            
            //取消iframe遮罩
            $("#jd_dialog_m_b_1").css("display", "none");
            
            //注销鼠标事件(mousemove mouseup)
            cleanMouseHandlers();
            
            //标记
            _flag = false;
            
            //清除异步移动
            //if(_timer){
            //	clearInterval(_timer);
            //	_timer = null;
            //}
        }
    };
    
    //注销鼠标事件(mousemove mouseup)
    var cleanMouseHandlers = function(){
        if (_controlObj) {
            $(_controlObj.document).unbind("mousemove");
            $(_controlObj.document).unbind("mouseup");
        }
    };
    
    return {
        //注册拖拽(参数为dom对象)
        Register: function(dragObj, controlObj){
            //赋值
            _dragObj = dragObj;
            _controlObj = controlObj;
            //注册事件(鼠标按下)
            $(_controlObj).bind("mousedown", dragMouseDownHandler);
        }
    }
    
}();
