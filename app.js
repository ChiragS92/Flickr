var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

//configure view-engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname,'bower_components')));

//define routes
app.get('/',function(req,res){
	res.render('welcome',[]);
});

app.get('/images',function(req,res){
    var text = req.query.searchText
	 var url = "http://127.0.0.1:7001/getImages?text="+text
    console.log(url);
    
    request({
    url: url,
    json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            
            res.render("images",{
            	resp : body
            })
        }
    });
});

app.get('/Upvote',function(req,res){
    res.redirect('/');
});


app.get('/Downvote',function(req,res){
    res.redirect('/');
});

app.post('/Upvote',function(req,res){
     id = req.query.id
     console.log(id)
     upvotes = req.query.upvotes
     console.log(upvotes)
    var url = "http://127.0.0.1:7001/upvote?id="+id+"&upvotes="+upvotes
    request({
    url: url,
    json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Upvote Successful!")
            res.end("Successful!");
        }
    });
});


app.post('/Downvote',function(req,res){
    id = req.query.id
    console.log(id)
    downvote = req.query.downvotes
    console.log(downvote)
    var url = "http://127.0.0.1:7001/downvote?id="+id+"&downvotes="+downvote
    request({
    url: url,
    json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Downvote Successful!")
            res.end("Successful!");
        }
    });
});

//start server
app.listen(8080,function(){
	console.log("Server Running on 8080!");
})