var exec = require("child_process").exec;
var querystring = require("querystring"); 
var fs = require("fs");
var formidable = require("formidable");
// function start(resp){
// 	console.log("Request handler 'start' was called.");
// 	//对不同http请求进行响应方法一
// 	// function sleep(milliSeconds){
// 	// 	var startTime = new Date().getTime();
// 	// 	while(new Date().getTime() < (startTime + milliSeconds));
// 	// }
// 	// sleep(2000);
// 	// return "Hello Start";
// 	// 
// 	// 
// 	// 方法二
// 	// 
// 	// 
// 	// var content = "empty";
// 	// exec("ls -lah", function(error, stdout, stderr){
// 	// 	content = stdout;
// 	// });
// 	// return content;
	
// 	exec("find/", {timeout:100000, maxBuffer:20000*1024}, function(error, stdout, stderr){
// 		resp.writeHead(200, {'Content-Type':'text/plain'});
// 	    resp.write(stdout);
// 	    resp.end();
// 	});
// }

function start(resp, postData){
	console.log("Request handler 'start' was called.");
	var body = '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" content="text/html; '+
				'charset=UTF-8" />'+
				'</head>'+
				'<body>'+
				'<form action=\'/upload\' enctype="multipart/form-data" method=\'post\'>'+
               	'<input type="file" name="upload" />'+
               	'<input type=\'submit\' value=\'Upload file\' />'+
          		'</form>'+
               	'</body>'+ 
          '</html>' 
	resp.writeHead(200, {'Content-Type':'text/html'});
    resp.write(body);
    resp.end();
}
function upload(resp, req){
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.uploadDir="/temp";
	form.parse(req, function(error, fileds, files){
		console.log("parsing done");
		console.log(files.upload.path);
		fs.renameSync(files.upload.path, "./temp/123.jpg");
		resp.writeHead(200, {'Content-Type':'text/html', 'charset':'UTF-8'});
    	resp.write("接收到的图片：<br/>");
    	resp.write('<img src="/show" />');
    	resp.end();
	})
}
function show(resp){
	console.log("Request handler 'show' was called.");
	fs.readFile("./temp/123.jpg", "binary", function(error, file){
		if(error){
			resp.writeHead(500, {'Content-Type':'text/plain'});
    		resp.write(error+"\n");
    		resp.end();	
		}else{
			resp.writeHead(200, {'Content-Type':'image/png'});
   	 		resp.write(file, "binary");
    		resp.end();
		}
	})
}
exports.start = start;
exports.upload = upload;
exports.show = show