var cors = require('cors'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

/*
 * Options
 */
module.exports.setOptions = (function (options, app) {
    if (options) {
        options.useCookieParser = options.useCookieParser ? options.useCookieParser : true;
        options.useBodyParser = options.useBodyParser ? options.useBodyParser : true;
        options.databaseName = options.databaseName ? options.databaseName : 'plungeTestDB';
        options.databaseUrl = options.databaseUrl ? options.databaseUrl : 'mongodb://localhost/' + options.databaseName;
    }

    if (options.useCookieParser) app.use(cookieParser());
    if (options.useBodyParser) {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json({extended: true}));
    }

    app.use(morgan('dev'));

});

/*
 * MONGOOSE
 */
module.exports.connect = (function (dbUrl) {
    mongoose.connect(dbUrl);
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
    process.exit(0);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected, is your server running?');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});