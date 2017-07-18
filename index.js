var db = require('./db');
var app = require('./routes/router');

//connecting to mongodb
db.connect('mongodb://localhost:27017/ajax', function (err) {
	if (err) {
		return console.log(err);
	}
	app.listen(3128, function () {
		console.log('Chat started');
	})
});
