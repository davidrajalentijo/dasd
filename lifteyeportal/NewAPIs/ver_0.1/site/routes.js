// site/routes.js
module.exports = function(app) {

	app.use(function(req, res, next) {		// route middleware that will happen on every request (auth ?)
	   console.log(req.method, req.url);
	   next();					// continue doing what we were doing and go to the route
	   });
	app.set('views', 'c:/Users/david/Desktop/website/dasd/lifteyeportal/NewAPIs/ver_0.1/client/views');
console.log(__dirname);
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');

	// Get Models
	var auth = require('../site/models/auth');
	var groups = require('../site/models/groups');
	var sites = require('../site/models/sites');
	var events = require('../site/models/events');

	//____________________________
	//
	// HOME PAGE (with login page)
	//____________________________
	app.get('/', function(req, res) {
		res.render('index.html');
	});
	app.get('/dashboard', function(req, res) {
		res.render('Dashboard.html');
	});
	app.get('/api', function(req,res) {
		res.send( 'Library API is running' );
	});

	app.get('/api/auth', auth.isAuthorised );
	app.post('/api/auth/login', auth.logsin );
	app.get('/api/auth/logout', auth.logsout );
	app.post('/api/auth/logas', auth.logsas );
	app.get('/api/auth/userlist', auth.userlist);
	app.post('/api/auth/changepassword', auth.password1);
	
	app.get('/api/groups', groups.getMyGroups );
	
	app.get('/api/sites', sites.getMySites );

	app.get('/api/events/:id', events.getEventsbyID );

};
