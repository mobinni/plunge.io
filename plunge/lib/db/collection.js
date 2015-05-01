/**
 * Created by mobinni on 29/04/15.
 */
var Collection = {},
    Document = require('./document.js'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Collections = require('./collections');

module.exports = (function (name) {
    // Bind name
    Collection.name = name;
    return Collection;
});

Collection.Schema = (function (schema) {
    Collection.Schema = new Schema(schema);
});

Collection.Register = (function () {
    // Define model
    Collection.model = mongoose.model(Collection.name, Collection.Schema);
    // Bind document methods
    Document.bind(Collection.Schema);
    // Add to collections
    Collections.add(Collection);
});

Collection.Create = (function (object, callback) {
    var obj = new Collection.model(object);
    obj.save().then(function(result) {
        callback(result);
    });
});