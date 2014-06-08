var http = require('http');
var path = require('path');

var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();

var staticDir = path.join(__dirname, 'dist');
app.use(serveStatic(staticDir));

var port = process.env.PORT || 3000;
http.createServer(app).listen(port);
console.log('Connect server started on port', port);
console.log('Serving static directory "' + staticDir + '/"');
