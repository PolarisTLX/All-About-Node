
//to load Node'js http built in module needed to beuild a server
let http = require('http');
let host = '127.0.0.1';  //host IP address to access the server
let port = '9000';  //port number that will bind to the hostname?

//this creates a server within Node.js
// request/ req,  response/res is crucial for the server method
let server = http.createServer(function(req, res){
  //writeHead method sets the header of the content that we are about to serve?
  //set it to first first an HTTP code of 200, which means "OK!"
  //'Content-type' tells the browser what kind of content is coming it's way
  //also called mild? types?
  res.writeHead(200, {'Content-Type' : 'text/html'});
  //end the response, and provide the content that we wish to serve
  res.end('<h1>Hello World!</h1>');
  //now need to make the server listen for requests that the user would make
  //needs, port, host and callback function
}).listen(port, host, function() {
  console.log('Server Running on HTTP://' + host + ':' + port);
});
