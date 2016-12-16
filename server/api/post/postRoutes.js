var router = require('express').Router();
var post = require('./postModel');
//grab categories??
// setup boilerplate route jsut to satisfy a request
// for building
var posts = [];
var id = 0;
router.route('/')
  .get(function(req, res){
      console.log("Here /api/posts /GET");
      res.json(posts);
        if(err) { 
            return res.sendStatus(500); 
        }
   })
    .post(function(req, res){
        console.log("Here /api/posts /POST");
        var user = req.body;
        id ++;
        post.id = id + '';
        posts.push(post);
        res.json(post);
            if(err) { 
            return res.sendStatus(500); 
        }
  });

router.param('post_id', function(req, res, next){
	post.findOne({'_id': req.params.post_id},
		function(err,aPost){
			if(aPost){	// Found post
				req.post_id = req.params.post_id;
				req.aPost = aPost;
				next();
			}else{		// Post not found
				req.post_id = req.params.post_id;
				next();
			}
		})
});
router.route('/:post_id')
	.get(function(req,res){
		res.json(req.aPost||{});
	})
	.delete(function(req,res){
		post.remove({'_id': req.post_id}, function(err){
        if(err) { 
            return res.sendStatus(500); 
        }
		});
	})
	.put(function(req,res){
		post.findOne({'_id':req.post_id}, function(err,aPost){
        if(err) { 
            return res.sendStatus(500); 
        }
			aPost.title = req.body.title;
            aPost.text = req.body.text;
			aPost.author = req.body.author;
			aPost.categories = req.body.categories;
		})
	});


function getPosts(res){
	post.find(function(err,posts){
		if(err) res.send(err);
		res.json(posts|| {} );
	})
};

module.exports = router;