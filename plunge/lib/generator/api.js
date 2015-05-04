var Collections = require('../models/collections'),
    routes = require('./routes'),
    mongoose = require('mongoose'),
    async = require('async');

module.exports.generate = (function (router) {
    async.each(Collections, function (collection, callback) {
        // Generate routes
        generateRoutes({collection: collection, router: router});

        // All went well
        callback(null);

    }, function (err) {
        if (err) next(new Error('Error while processing Collections'))
    });

});

function generateRoutes(params) {
    var collection = params.collection,
        router = params.router;
    // Define route name
    var name = collection.name.toLowerCase(),
        model = collection.model;

    // Emit events to generate routes
    routes.generateAllRoute({routeBase: name, model: model, router: router});
    routes.generateFindOneRoutes({
        routeBase: name,
        model: model,
        router: router,
        schema: collection.Schema
    });

}
