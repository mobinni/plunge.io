/**
 * Created by mobinni on 28/04/15.
 */

// Define variables
var logger = null,
    port = null,

// Initialise Express
    express = require('express'),
    app = express(),
    router = express.Router(),

// Load external packages
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Export base method to setup your server
var Plunge = {};

Plunge.init = (function (options) {
    if (options) {
        logger = options.logger ? options.logger : require('morgan');

        options.useCookieParser = options.useCookieParser ? options.useCookieParser : true;
        options.useBodyParser = options.useBodyParser ? options.useBodyParser : true;
        options.databaseName = options.databaseName ? options.databaseName : 'plungeTestDB';
        options.databaseUrl = options.databaseUrl ? options.databaseUrl : 'mongodb://localhost/' + options.databaseName;
    }

    if (options.useCookieParser) app.use(cookieParser);
    if (options.useBodyParser) app.use(bodyParser);

    // Mongoose connect
    mongoose.connect(options.databaseUrl);

    // App settings
    app.use(logger);
});


Plunge.listen = (function (options){
    port = options.port ? options.port : 3000;
    options.message = options.message ? options.message : '';

    app.listen(port, function () {
        console.log(options.message + ' ' + options.port)
    });
});

// Initialise router for the API at a specific route
Plunge.initAPI = (function (route) {
    app.use(route, router);
});

// Expose base libraries
Plunge.router = router;

Plunge.express = express;

Plunge.app = app;

Plunge.cors = cors;

Plunge.logger = logger;

Plunge.mongoose = mongoose;

module.exports = Plunge;