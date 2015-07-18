var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

//configure view-engine
app.set('view engine','html');
app.set('views',path.join(__dirname,'views'));

//use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname,'bower-components')));

//define routes
app.use(require('./routes'));

//start server
app.listen(8080,function(){
	console.log("Server Running on 8080!");
})