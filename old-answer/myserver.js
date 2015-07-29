//使用node.js做一个简单的服务器，发送给前台通过jsonp跨域请求数据
var ng = require('nodegrass'),//引入各模块
     http=require('http'),
     url=require('url'),
	 express=require('express');

var app = express();

//创建服务器
 http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	
	if(pathname === '/'){
		ng.get('http://photo-sync.herokuapp.com/photos',function(data){
			res.writeHead(200, { 'Content-Type':'text/plain' });
			res.end('callback('+data+')');//构造jsonp的回调函数
			},'utf8');
		}
 }).listen(80);
 console.log('server listening 80...');