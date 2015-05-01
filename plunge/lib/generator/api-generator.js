var Collections = require('../db/collections')
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
        model.find({}).then(function (result) {
            res.json(result);
        })
    });

    router.get('/' + name + '/:id', function (req, res) {
        var id = req.params.id;
        if (!id) res.send('fail');
        else {
            model.findOne({'_id': id}).then(function (result) {
                if (!result) res.error();
                else {
                    res.json(result);
                }
            });
        }
    });

}