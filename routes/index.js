const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.use('/wiki', wikiRouter);



// router.get('/:page', function(req, res) {
//   var pageName = req.params.page;  
//   // if(pages.findAll({ where: {page_name: pageName}})) {
//   // 	res.render( 'index', {pageName: pageName});
//   // } else { 
//   	res.render( 'wikipage', {pageName: pageName});
//   //}
// });

module.exports = router;