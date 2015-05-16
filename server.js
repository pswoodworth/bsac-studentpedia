var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	MongoClient = require('mongodb').MongoClient;

require('dotenv').load();
app.use(express.static('www'));

var apicache = require('apicache').options({ debug: true }).middleware;

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});


var mongoUrl = process.env.MONGO_URI;

console.log(mongoUrl);



// API Routes
// app.get('/blah', routeHandler);

app.use(bodyParser.json());

app.get('/content',  function(req, res){
	// res.jsonp(allContent);

	MongoClient.connect(mongoUrl, function(err, db) {

	  var collection = db.collection('live');
	  // Insert some documents
	  collection.find().limit(1).sort({$natural:-1}).toArray(function(err, docs){
	  	result = docs[0];
	  	delete result._id;
	  	res.jsonp(result);
	  	db.close();
	  });

	});

});

app.post('/save', function(req, res){

	MongoClient.connect(mongoUrl, function(err, db) {

	  var collection = db.collection('live');
	  // Insert some documents
	  collection.insert(req.body.data, function(err,result){
	  	if (err){
	  		console.log(err);
	  	}else{
	  		console.log('sucessfully saved');
	  	}
	  	 db.close();
	  });

	});

	res.send('success');
});




app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});


