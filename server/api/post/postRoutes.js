var router = require('express').Router();
var post = require('./postModel');
// setup boilerplate route jsut to satisfy a request
// for building
router.route('/')
  .get(function(req, res){
    console.log('Hey from post!!');
    res.send({ok: true});
  });

var posts = [];
var id = 0;
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

router.route('/')
    .get(function(req, res){
        console.log("Here /api/posts /GET");
        res.json(posts);
    //getUsers(res);
    })

    .get('/posts/:id',function(req,res){
        console.log("User id found");
          var post = _.find(posts, {id: req.params.id});
            res.json( post || {});
    })
    .post(function(req, res){
        console.log("Here /api/posts /POST");
        var user = req.body;
        id ++;
        post.id = id + '';
        post.push(post);
        res.json(post);
    // Problem here, can't parse req.body with body-parser or JSON.parse
        console.log(">>>> Req.body: \n" + req.body);
        console.log("Created new user: " + req.body.username);
    })
    .delete(function(res,req){
        
    })
    .put(function(res, req){
    
        
    })
    // D


router.route('/:post_id')
	.get(function(req,res){
		res.json(req.aPost||{});
	})
	.delete(function(req,res){
		post.remove({'_id': req.post_id}, function(err){
				if(err) throw err;
		});
	})
	.put(function(req,res){
		post.findOne({'_id':req.post_id}, function(err,aPost){
			if(err) throw err;
			aPost.title = req.body.title;
			aPost.text = req.body.text;
			aPost.author = req.body.author;
			aPost.categories = req.body.categories;
		})
	});

//function getPosts(res){
//	post.find(function(err,posts){
//		if(err) res.send(err);
//		res.json(posts|| {} );
//	})
//};

module.exports = router;