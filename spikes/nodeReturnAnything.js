app.get('/^(.+)$/', function(req, res) {
	res.sendfile('/' + req.params[0]);
});