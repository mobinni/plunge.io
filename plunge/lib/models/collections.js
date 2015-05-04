// Exposed object within the same memory heap
var eventHandler = require('../config/eventbus'),
    Collections = [];

module.exports = Collections;

// Register event method
eventHandler.on('e_add_collection', add);

function add(collection) {
    if (Collections.indexOf(collection) > -1) throw new Error('Duplicate collection definition');
    else {
        return Collections.push(collection);
    }
}


