var express = require('express');

var router = express.Router();

router.get('/',function(){
	res.render('welcome');
});

router.get('/images',function(){
});

module.exports = router;