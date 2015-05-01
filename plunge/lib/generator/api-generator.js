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

    // Route to get all
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
        var urlKey = key.replace('_','').toLowerCase();
        var queryKey = key.toLowerCase();

        router.get('/' + name + '/' + urlKey + '/:param', function (req, res) {
            var param = req.params.param;
            var query = {};
            query[queryKey] = param;
            model.findOne(query, function (err, result) {
                if (err) res.handleError(err);
                else {
                    res.handleResult(result);
                }
            });
        });
    });

}