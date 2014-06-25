var http = require('http');
var net = require('net');
//var fs = require('fs');
//var index = fs.readFileSync('index.html');
var url = require('url'),
http = require('http'),
qs = require('querystring');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
//  console.log(req);
  

    if(req.method=='POST') {
    	console.log("I'm hearing a POST request");
            var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){
                
                var POST =  qs.parse(body);
                console.log(body);
                console.log(POST);
            });
    }
    else if(req.method=='GET') {
    	console.log("I'm getting a GET request");
    	console.log(req.url);
        var url_parts = url.parse(req.url,true);
        console.log(url_parts.query);
    }

    res.end("heard it");


}).listen(9615);




var HOST = '192.168.1.28';
var PORT = 6969;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        //sock.write('You said "' + data + '"');
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);