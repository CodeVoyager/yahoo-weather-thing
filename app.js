var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    front = require('./routes/front'),
    api = require('./routes/api'),
    twig = require('twig'),
    app = express(),
    io = require('socket.io'),
    dealers = [],
    tables = [];

app.io = io();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.set('view cache', false);
app.set('cache', false);
twig.cache(false);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/', front);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.io.on('connection', function (socket) {
    socket.emit('connected', {
        message: 'Done!'
    });
    socket.on('type-selection', function (data) {
        console.log(data);
        if (data && data instanceof Object) {
            switch (data.type) {
                case 'dealer':
                    dealers.push(socket);
                    break;
                case 'table':
                    tables.push(socket);
                    break;
                default:
                    console.log('unknown type');
                    break;
            }
        }
    });
    socket.on('card-send', function (data) {
        var index = -1;

        console.log(data);

        while (++index < tables.length) {
            tables[index].emit('card-received', data);
        }
    });
});

module.exports = app;