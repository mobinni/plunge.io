/**
 * Created by mobinni on 29/04/15.
 */
var Collection = {},
    eventHandler = require('../config/eventbus'),
    Document = require('./document.js'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
    eventHandler.emit('e_add_collection', Collection);
});

Collection.Create = (function (object) {
    var obj = new Collection.model(object);
    obj.save(function (err, result) {
        // Emit error, not an exception
        if (err) eventHandler.emit('e_document_error', err);
        else {
            eventHandler.emit('e_document_saved', result);
        }
    });
});