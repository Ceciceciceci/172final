var router = require('express').Router();

// setup boilerplate route jsut to satisfy a request
// for building

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

var users = [];
var id = 0;

router.param('user_id', function (req,res,next){
	user.findOne({'_id': req.params.user_id}, 
		function(err, theUser){
			if(theUser){
				console.log("Found User: " + theUser);
				req.user_id = req.params.user_id;
				req.theUser = theUser;
				next();
			}else{
				req.user_id = req.params.user_id
				console.log("User not found: " + req.user_id );
				next();
			}
		}
	);
});

router.route('/')
  .get(function(req, res){
    console.log("Here /api/users /GET");
    res.json(users);
    //getUsers(res);
  })
  .post(function(req, res){
	console.log("Here /api/users /POST");
	var user = req.body;
    id ++;
    user.id = id + '';
    users.push(user);
    res.json(user);
	// Problem here, can't parse req.body with body-parser or JSON.parse
	console.log(">>>> Req.body: \n" + req.body);
	console.log("Created new user: " + req.body.username);
  })
//	user.create({username: req.body.username, address: req.body.address}, function(err,user){
//		if(err) res.send(err);
//		console.log("Created new user: " + req.body.username);
//		user.save(function(err){
//			if(err) return res.send();
//			res.json({message: 'New User Created!'});
//		});
//  	})
// Delete and Put will trigger error. Get return Hello normally
  .delete(function(req,res,next){
	var err = new Error('Trigger Error');
	next(err);
  })
  .put(function(req,res,next){
	var err = new Error('Trigger Error');
	next(err);
  });

router.route('/:user_id')
	.get(function(req,res){
		console.log("Here /api/user/:user_id /GET");
		res.json(req.theUser || {});
	})	
	.delete(function(req,res){
		user.remove({'_id': req.user_id},function(err){
			if(err) throw err;
		});
	})
	.put(function(req,res){
		user.findOne({'_id': req.user_id}, function (err, theUser){
			if(err) throw err;
			theUser.username = req.body.username;
			theUser.address = req.body.address;
		})
		getUsers(res);
	});

//function getUsers(res){
//	user.find(function(err,users){
//		if(err) res.send(err);
//		res.json(users||{});
//	});
//};

module.exports = router;


//.route
//.param