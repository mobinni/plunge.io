/**
 * Test all functionality in plunge.js
 */

var assert = require("assert"),
    eventBus = require('../lib/config/eventbus');



describe('Test eventBus', function () {
    describe('#exposed variables', function () {
        it('should emit and catch event', function (done) {
            eventBus.emit('e_test', 'hello world');
            eventBus.on('e_test', function (param) {
                assert.strictEqual('hello world', param, 'Event param not equal to hellow world');
            });
            done();
        });

    });
});


