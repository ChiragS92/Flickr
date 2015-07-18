var express = require('express');

var router = express.Router();

router.get('/',function(req,res){
	res.render('welcome');
});

router.get('/images',function(req,res){
});

module.exports = router;