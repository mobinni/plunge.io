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
 * Custom handlers
 */

module.exports.setCustomHandlers = (function (app) {
    // Custom error handler for res
    app.use(function (req, res, next) {
        res.handleError = (function (error) {
            res.status(error.status || 500);
            res.json(error);
        });
        next();
    });

    // Custom result handler
    app.use(function (req, res, next) {
        res.handleResult = (function (result) {
            if (result) {
                res.status(result.status || 200);
                res.json(result);
            } else {
                res.status(500).json({error: 'result was null'});
            }
        });
        next();
    });
});

/*
 * MONGOOSE
 */
module.exports.connect = (function (dbUrl) {
    mongoose.connect(dbUrl, function (error) {
        if (error) {
            console.log('Something went wrong while connecting to the database');
            process.exit(0);
        }
    });
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