var express = require('express'),
	app = express();

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

// API Routes
// app.get('/blah', routeHandler);

var allContent = {
	content:[
		{
		title: 'First Thing',
		contains: 'list',
		content: [
			{
				title: 'Inside the First Thing',
				contains: 'list',
				content: [
				{
					title: 'Inside inside the first thing',
					contains: 'html',
					content: 'content inside inside inside the first thing'
				}
				]
			}
		]
		},
		{
		title: 'Second Thing',
		contains: 'html',
		content: '<p>here\'s the content for the second thing</p>'
		}
	]
};

app.get('/content', function(req, res){
	res.jsonp(allContent);
});

app.post('/save-content', function(req, res){
	// mongo uri:
	// mongodb://admin:SDK23je2119jvs_|sfjw@dogen.mongohq.com:10037/bsac-studentpedia
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});