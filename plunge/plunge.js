/**
 * Created by mobinni on 28/04/15.
 */

// Define variables
var port = null,

// Initialise Express
    express = require('express'),
    app = express(),
    router = express.Router(),
    eventHandler = require('./lib/config/eventbus'),
    api = require('./lib/generator/api'),

// Load external packages
    cors = require('cors'),
    mongoose = require('mongoose'),
    configuration = require('./lib/config/configuration');

// Export base method to setup your server
var Plunge = {};

Plunge.init = (function (options) {
    // Set options
    configuration.setOptions(options, app);

    // Set custom handlers
    configuration.setCustomHandlers(app);

    // Mongoose connect
    configuration.connect(options.databaseUrl);

});

Plunge.listen = (function (options) {
    app.set('port', options.port ? options.port : 3000);
    options.message = options.message ? options.message : '';

    app.listen(app.get('port'), function () {
        console.log(options.message + ' ' + options.port)
    });
});

// Initialise router for the API at a specific route
Plunge.initAPI = (function (route) {
    api.generate(router);
    app.use(route, router);
});

// Expose base libraries
Plunge.router = router;

Plunge.express = express;

Plunge.app = app;

Plunge.cors = cors;

Plunge.mongoose = mongoose;

Plunge.eventHandler = eventHandler;

module.exports = Plunge;

