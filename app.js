/**
 * Module dependencies.
 */

var express = require('express'), 
routes = require('./routes'), 
http = require('http'),
crudsiswa = require('./routes/siswa'),
path = require('path');
var bodyParser = require('body-parser');

var app = express();

// all environments
app.set('port', process.env.PORT || 1234);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//data manupulation sample
app.get("/", function(req, res){
	res.json({"data" : "hello worlds"})
});

app.post("/showbody", function(req, res){
	res.json({"username" : req.body.username,
			"password" : req.body.password
	})
});

app.get("/alldata", crudsiswa.allsiswa);

app.get("/:nim", crudsiswa.search_by_nim);

app.post("/addsiswa", crudsiswa.addsiswa);

app.put("/updatesiswa/:nim", crudsiswa.update);

app.delete("/deletesiswa/:nim", crudsiswa.delete);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
