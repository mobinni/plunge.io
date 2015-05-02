// Exposed object within the same memory heap
var eventHandler = require('../config/eventbus'),
    Collections = [];

module.exports =  Collections;

// Register event method
eventHandler.on('e_add_collection', add);

function add(collection) {

    if (Collections.indexOf(collection) <= -1) {
        return Collections.push(collection);
    } else {
        var error = new Error('Duplicate collection definition');
        console.log(error)
    }
}


