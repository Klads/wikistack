const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

router.get('/', function (req, res, next) {
  //res.send('got to get /wiki/');
  //res.redirect( '/' );
  Page.findAll().then(function(foundPages) {
  	//res.json(foundPage);
  	//console.log("*** ", foundPages);
  	var pages = [];
  	for(var i = 0; i<foundPages.length; i++) {
  		//console.log(foundPages[i].get({plain: true}).title);
  		//pages.push({title: foundPages[i].get({plain: true}).title, url: foundPages[i].get({plain: true}).urlTitle})
  		pages.push(foundPages[i].dataValues)
  	}
  	console.log('*******',pages);
  	res.render('index', {pages: pages});
  }).catch(next);
});

router.post('/', function(req, res, next) {
	var reqEmail = req.body.email;

	function createUser(name, email) {
		var user = User.build({
		  name: name,
		  email: email,
		});
		user.save();
	}

	function createPage(title, content, userID) {
		var page = Page.build({
		  title: title,
		  urlTitle: encodeURI(title),
		  content: content,
		  authorId: userID
		});
		page.save().then(res.redirect(page.route));
	}

	function findUser(email) {
		return User.find(email);
	}

	console.log(findUser(reqEmail));

    //User.find(req.body.email).then(function() {
  	// 	if(user not found) {
  	// 		//createUser(req.body.name, req.body.email);
  		
  	// 		var user = User.build({
			//   name: req.body.name,
			//   email: req.body.email,
			// });
			// user.save().then(
			// 	//get user id
		 //  		var page = Page.build({
			// 	  title: req.body.title,
			// 	  urlTitle: encodeURI(req.body.title),
			// 	  content: req.body.content
			// 	});
			// 	page.save().then(res.redirect(page.route));
			// );
  	// 	}
  		//get user id
  // 		var page = Page.build({
		//   title: req.body.title,
		//   urlTitle: encodeURI(req.body.title),
		//   content: req.body.content
		// });
		// page.save().then(res.redirect(page.route));
  	//})
});

router.get('/add', function (req, res, next) {
  //res.send('got to get /wiki/add');
  res.render( 'addpage' );
});

router.get('/:page', function (req, res, next) {
  Page.findOne({
  	where: {urlTitle: req.params.page}
  }).then(function(foundPage) {
  	//res.json(foundPage);
  	//console.log(foundPage);
  	res.render('wikipage', {title: foundPage.title, content: foundPage.content, urlTitle: foundPage.urlTitle});
  }).catch(next);

  //res.send( 'Loaded ' + req.params.page );
});

module.exports = router;