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
		function(err, aUser){
			if(aUser){
				console.log("Found User: " + aUser);
				req.user_id = req.params.user_id;
				req.aUser = aUser;
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
        if(err) { 
            return res.sendStatus(500); 
        }
    })
    .post(function(req, res){
        console.log("Here /api/users /POST");
        var user = req.body;
        id ++;
        user.id = id + '';
        users.push(user);
        res.json(user);
        if(err) { 
            return res.sendStatus(500); 
        }
    })
    .delete(function(req, res, next){
       var err = new Error('Errorr!!!');
       next(err);
    })
    .put(function(req,res,next){
        var err = new Error('Error!!');
        next(err);
    });

router.route('/:user_id')
    .get(function(req,res){
        console.log("Here /api/user/:user_id /GET");
        res.json(req.aUser || {});
        if(err) { 
            return res.sendStatus(500); 
        }
    })	
    .delete(function(req,res){
        user.remove({'_id': req.user_id},function(err){
            if(err) {
               return res.sendStatus(500); 
            }
        });
    })
    .put(function(req,res){
        user.findOne({'_id': req.user_id}, function (err, aUser){
            if(err) {
                throw err;
            }
            aUser.username = req.body.username;
            aUser.address = req.body.address;
        })
        getUsers(res);
    });

module.exports = router;


//.route
//.param