
//to load Node'js http built in module needed to beuild a server
let http = require('http');
let fs   = require('fs');  //file system module allows us to interact with files on the disk
let path = require('path');//to construct valid paths for files that will be served with 'fs'
let host = '127.0.0.1';  //host IP address to access the server
let port = '9000';  //port number that will bind to the hostname?

//for use on line with:   res.writeHead(200, { 'Content-Type':
let mimes = {   //these are common file types to make it shorter in the code below
  ".htm" : "text/html",
  ".css" : "text/css",
  ".js" : "text/javascript",
  ".gif" : "image/gif",
  ".jpg" : "image/jpeg",
  ".png" : "image/pgn"
}

//this creates a server within Node.js
// request/ req,  response/res is crucial for the server method
let server = http.createServer(function(req, res){
  //extract the file name that the user has requested
  //if req.url is a "/" (the root of a website being served)
  //the filename that we want to serve would be the ./index.htm
  //else it should be the specific filename of the file being requested
  //req.url contains the reference to the requested file
  let filepath = (req.url === '/') ? ('./index.htm') : ('.' + req.url);
  //we extract the file extension type from the requested file
  //then get the matching content type from our mimes object
  //path.extname method accepts path to a filename and extracts the extension
  let contentType = mimes[path.extname(filepath)];
  //check to see if the file exists or not:
  fs.exists(filepath, function(file_exists){
    //if the file exists, continue and reading that file
    //else throw an error
    if(file_exists){
      //read the file and and serve
      //problem with this method though is it buffers files to memeory first before serving them out
      fs.readFile(filepath, function(error, content){
        //check to see if there is any error:
        if(error){  //throw the 500 server error code and just end response object there:
          res.writeHead(500);
          res.end();
        } else {  //if all goes well:  code 200, and the file type of the content
          res.writeHead(200, { 'Content-Type': contentType})
          //finally, we plug in the content variable that fs.readFile above provides, to serve the file
          //set encoding at 'utf-8', not sure why
          res.end(content, 'utf-8');
        }
      })
    } else {
      //404 = http code for "file not found"
      res.writeHead(404);
      //this message will be displayed
      res.end("Sorry we could not find the file you requested!");
    }
  })
}).listen(port, host, function() {
  console.log('Server Running on HTTP://' + host + ':' + port);
});
