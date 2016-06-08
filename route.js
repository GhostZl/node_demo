function route(pathname, handle, resp, req){
	console.log("About to route a request for " + pathname);
	if(typeof handle[pathname] === 'function'){
		return handle[pathname](resp, req);
	}else{
		console.log("No request handle found for " + pathname)
		resp.writeHead(200, {'Content-Type':'text/plain'});
	    resp.write("404 Not Found!");
	    resp.end();
	}
}

exports.route = route;