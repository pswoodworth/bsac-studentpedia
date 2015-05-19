var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	MongoClient = require('mongodb').MongoClient,
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	basicAuth = require('basic-auth');

require('dotenv').load();
app.use(express.static('www'));
app.use(bodyParser.json());

// creating database connections
var mongoUrl = process.env.MONGO_URI;
var authUser = process.env.AUTH_USER;
var authPass = process.env.AUTH_PASS;
var collection;
var database;

MongoClient.connect(mongoUrl, function(err, db) {
	database = db;
	collection = db.collection('live');
});


// establish mongo session store (used for admin logins)
app.use(session({
    store: new MongoStore({ url: mongoUrl }),
    secret: 'sdkwn2393njwle@awENFkw'
}));


// basic-auth

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === authUser && user.pass === authPass) {
    return next();
  } else {
    return unauthorized(res);
  };
};


var apicache = require('apicache').options({ debug: true }).middleware;

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});


// API Routes
app.get('/content', function(req, res){
	collection.find().limit(1).sort({$natural:-1}).toArray(function(err, docs){
		result = docs[0];
		delete result._id;
		res.jsonp(result);
	});
});

app.get('/admin(|/*)', auth, function(req, res){
    var uid = req.params.uid,
        path = req.params[0] ? req.params[0] : '/index.html';
    res.sendFile(path, {root: './admin'});
});

app.post('/save', auth, function(req, res){

	  collection.insert(req.body.data, function(err,result){
	  	if (err){
	  		console.log(err);
	  	}else{
	  		console.log('sucessfully saved');
	  		res.send('success');
	  	}
	  });
});




app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});


