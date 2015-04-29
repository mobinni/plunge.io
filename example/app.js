/**
 * Created by mobinni on 28/04/15.
 */
var Plunge = require('plunge'),
    Collection = require('plunge/lib/collection');

router = Plunge.router;

// Import routes
require('./routes/api-user.js');

var testCol = Collection('TestDocument');

testCol.Schema({
    name: String
});

testCol.Register();

testCol.Create({name: 'tozz'});


// Init app
Plunge.init({});

// Initialize API after calls at a certain subpath
Plunge.initAPI('/api');

// Start webserver
Plunge.listen({
    message: 'Server started at port',
    port: 2000
});
