/**
 * Created by mobinni on 28/04/15.
 */
var Plunge = require('plunge'),
    Collection = require('plunge/lib/models/collection');

var testCol = Collection('TestDocument');

testCol.Schema({
    name: String
});

testCol.Register();

testCol.Create({name: 'willy'});

Plunge.eventHandler.on('e_document_saved', function (result) {
    console.log(result)
});

// Init app
Plunge.init({});

// Initialize API after calls at a certain subpath
Plunge.initAPI('/api');

// Start webserver
Plunge.listen({
    message: 'Server started at port',
    port: 2000
});
