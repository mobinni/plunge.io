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
    apiGenerator = require('./lib/generator/api-generator'),

// Load external packages
    cors = require('cors'),
    mongoose = require('mongoose'),
    configuration = require('./lib/config/configuration');

// Export base method to setup your server
var Plunge = {};

Plunge.init = (function (options) {
    // Set options
    configuration.setOptions(options, app);

    // Mongoose connect
    configuration.connect(options.databaseUrl);

});


Plunge.listen = (function (options) {
    port = options.port ? options.port : 3000;
    options.message = options.message ? options.message : '';

    app.listen(port, function () {
        console.log(options.message + ' ' + options.port)
    });
});

// Initialise router for the API at a specific route
Plunge.initAPI = (function (route) {
    apiGenerator.generate(router);
    app.use(route,router);
});

// Expose base libraries
Plunge.router = router;

Plunge.express = express;

Plunge.app = app;

Plunge.cors = cors;

Plunge.logger = logger;

Plunge.mongoose = mongoose;

module.exports = Plunge;
