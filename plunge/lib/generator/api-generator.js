var eventHandler = require('../config/eventbus'),
    Collections = require('../db/collections'),
    routes = require('./routes'),
    mongoose = require('mongoose'),
    async = require('async');

module.exports.generate = (function (router) {
    async.each(Collections, function (collection, callback) {

        // Emit event
        eventHandler.emit('e_generate_routes', {collection: collection, router: router});

        // All went well
        callback(null);

    }, function (err) {
        if (err) next(new Error('Error while processing Collections'))
    });

});

// Bind handler to method on event
eventHandler.on('e_generate_routes', generateRoutes);

function generateRoutes(params) {
    var collection = params.collection,
        router = params.router;
    // Define route name
    var name = collection.name.toLowerCase(),
        model = collection.model;

    // Emit events to generate routes
    eventHandler.emit('e_generate_route_get_all', {routeBase: name, model: model, router: router});
    eventHandler.emit('e_generate_find_one_routes', {
        routeBase: name,
        model: model,
        router: router,
        schema: collection.Schema
    })

}

// Register event handlers
eventHandler.on('e_generate_route_get_all', routes.generateAllRoute);
eventHandler.on('e_generate_route_get_all', routes.generateFindOneRoutes);

