// MAIN file
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    users = require('./routes/users'),
    work = require('./routes/work'),
    admin = require('./routes/admin'),
    app = express();

var io = require('socket.io')



// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//socket.io



// route
app.use('/', routes);
app.use('/users', users);
app.use('/work', work);
app.use('/admin', admin);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});



//for io
var debug = require('debug')('generated-express-app');
var port = ('3000');
app.set('port', port);


var server = app.listen(app.get('port'), function() {
    console.log('listen on ', app.get('port'));
    debug('Express server listening on port ' + server.address().port);
});

var io = require('socket.io').listen(server);
var ioApi = require('./api/chatApi');

ioApi.init(io);





module.exports = app;
