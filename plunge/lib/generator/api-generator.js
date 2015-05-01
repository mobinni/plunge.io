var Collections = require('../db/collections'),
    mongoose = require('mongoose');

module.exports.generate = (function (router) {
    Collections.get().forEach(function (Collection) {
        generateRoutes(Collection, router);
    });

});

function generateRoutes(Collection, router) {
    // Define route name
    var name = Collection.name.toLowerCase();
    var model = Collection.model;

    // Route to get all documents of a collection
    router.get('/' + name, function (req, res) {
        model.find({}, function (err, result) {
            if (err) res.handleError(err);
            else {
                res.handleResult(result);
            }
        })
    });

    var keys = Object.keys(Collection.Schema.paths);
    keys.forEach(function (key) {
        // make key lowercase just to be sure - redundant
        key = key.toLowerCase();
        // Generate get route for each key of an object to get a single value
        router.get('/' + name + '/' + key + '/:param', function (req, res) {
            // Generic param
            var param = req.params.param;
            // Build query element for findOne
            var query = {};
            query[key] = param;
            model.findOne(query, function (err, result) {
                if (err) res.handleError(err);
                else {
                    res.handleResult(result);
                }
            });
        });
    });

}