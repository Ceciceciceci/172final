var router = require('express').Router();

// setup boilerplate route jsut to satisfy a request
// for building
var categories = [];
var id = 0;

router.route('/')
  .get(function(req, res){
      console.log("Here is categories /GET");
    res.json(categories);
//    console.log('Hey from categories!!');
//    res.send({ok: true});
  })
  .post(function(req,res){
        console.log("Here is categories /POST");
        var category = req.body;
        id ++;
        category.id = id + '';
        category.push(category;)
    })

router.param('cate_id', function(req, res, next){
	post.findOne({'_id': req.params.cate_id},
		function(err,cate){
			if(cate){	// Found post
				req.cate_id = req.params.cate_id;
				req.cate= cate;
				next();
			}else{		// Post not found
				req.cate_id = req.params.cate_id;
				next();
			}
		})
});

module.exports = router;
