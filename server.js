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
	title: 'Menu',
	contains: 'list',
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

var tempContent = {
	title: 'Menu',
	contains: 'list',
	content:[
		{
		title: 'Home',
		contains: 'html',
		content: '<p><b>hey – this entire app is very rough, and only for demonstration purposes at this point. there is a lot still to be done in styling and typesetting, as well as adding in more content</b><br><br><br>This space will contain upcoming events.</p>'
		},
		{
		title: 'About',
		contains: 'list',
		content: [
			{
				title: 'BSAC',
				contains: 'html',
				content: "<p>The Boston Student Advisory Council is a citywide body of elected student leaders representing most Boston Public High Schools. BSAC is co-administered by Youth on Board and the Boston Public Schools Office of Engagement. BSAC works to identify and address issues that matter the most to students, thereby putting young people at the center of the decisions that affect them the most. BSAC students have led organizing efforts, forged relationships with district and city-leaders, impacted policy change, and transformed school culture across the board.<br><br><b>If you are interested in becoming a BSAC member or attending a meeting please contact: bsac@bostonpublicschools.org</b><br><br> Find us on Facebook!<br>Youtube & Twitter!</p>"
			},
			{
				title: 'School Discipline & Student Rights',
				contains: 'html',
				content: '<p>Students Have Rights! Boston and Massachusetts have some of the most progressive and student friendly school discipline policies in the U.S.. However, Boston students are still being unfairly kicked out of their schools for minor offenses with students of color, students with disabilities, and low-income students being most affected by harsh discipline. In the 2012-2013 School Year: Massachusetts students missed at least 208,605 days in the classroom due to disciplinary removal. nearly two-thirds (72%) of all these out-of-school suspensions were for “non-violent, non-criminal, non-drug’ offenses. Students of color, students with disabilities, and low-income students experienced a disproportionate share of these disciplinary removals from school. Students of color were disciplined more harshly and more often than white students for “non-violent, non-criminal, non-drug” incidents. Students with disabilities were suspended out-of-school at three times the rate of their non-disabled peers. Students receiving free or reduced lunch were disciplined at a rate almost double their enrollment Students that are taken away from their education by out of school suspension or e are more likely to fall behind in schoolwork or drop out. Harsh school discipline that remove students from the classroom contribute to the school-to-prison pipeline Source: Lawyer’s Committee for Civil Rights and Economic Justice “Not Measuring Up: The State of School Discipline in Massachusetts” 2015.</p>'
			}
		]
		}
	]
};

app.get('/content', function(req, res){
	res.jsonp(tempContent);
});

app.post('/save-content', function(req, res){
	// mongo uri:
	// mongodb://admin:SDK23je2119jvs_|sfjw@dogen.mongohq.com:10037/bsac-studentpedia
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});