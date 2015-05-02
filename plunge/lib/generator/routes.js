var async = require('async');

module.exports.generateAllRoute = function (params) {
    var routeBase = params.routeBase,
        model = params.model,
        router = params.router;

    router.get('/' + routeBase, function (req, res) {
        model.find({}, function (err, result) {
            if (err) res.handleError(err);
            else {
                res.handleResult(result);
            }
        })
    });
};

// Generates findOne routes for all document keys
module.exports.generateFindOneRoutes = function (params, next) {
    var routeBase = params.routeBase,
        model = params.model,
        router = params.router;

    var keys = Object.keys(model.schema.paths);
    async.each(keys, function (key) {
        // make key lowercase just to be sure - redundant
        key = key.toLowerCase();
        // Generate get route for each key of an object to get a single value
        router.get('/' + routeBase + '/' + key + '/:param', function (req, res) {
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
    }, function (err) {
        if (err) next(new Error('Error while generating findOne routes'))
    });

};