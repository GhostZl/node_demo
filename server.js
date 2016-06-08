var http = require("http");
var url = require("url");
function start(route, handle){
	function onRequest(req, resp){
		var postData = "";
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " receive");
		route(pathname, handle, resp, req);
		// req.setEncoding("utf-8");
		// req.addListener("data", function(postDataChunk){
		// 	postData += postDataChunk;
		// 	console.log("Received POST data chunk '"+postDataChunk+"'.");
		// });
		// req.addListener("end", function(){
		// 	route(pathname,handle,resp,postData);
		// });
	}
	http.createServer(onRequest).listen(8888);
	console.log("i am zl!");
}
exports.start = start;