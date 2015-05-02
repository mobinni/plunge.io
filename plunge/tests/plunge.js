/**
 * Test all functionality in plunge.js
 */

var assert = require("assert"),
    mongoose = require('mongoose'),
    Collection = require('../lib/models/Collection'),
    Collections = require('../lib/models/Collections'),
    Plunge = require('../plunge');

before(function (done) {
    Plunge.init({});
    mongoose.connection.on('connected', function () {
        assert.equal(mongoose.connection.readyState, 1);
        done();
    });
});

describe('Test Plunge configuration', function () {
    describe('#exposed variables', function () {
        it('should have express, router, cors, logger and mongoose exposed', function (done) {
            assert.strictEqual(true, !!Plunge.express, 'Express not defined');
            assert.strictEqual(true, !!Plunge.router, 'Router not defined');
            assert.strictEqual(true, !!Plunge.cors, 'Cors not defined');
            assert.strictEqual(true, !!Plunge.mongoose, 'Mongoose not defined');
            done();
        });
    });

    describe('#collections', function () {
        it('should generate and register a collection', function (done) {
            var collection = Collection('TestCollection');
            collection.Schema({
                name: String
            });
            collection.Register();
            assert.strictEqual('TestCollection', collection.name, "Collection name not equal");
            assert.strictEqual(true, !!collection.Schema, "Collection Schema not defined");
            done();
        });

        it('should contain the recently registered collection', function (done) {
            assert.strictEqual('TestCollection', Collections[0].name, "Collection name not equal");
            done();
        });

        it('should have generated routes', function (done) {
            Plunge.initAPI('/api');
            assert(Plunge.router.stack.length > 1, "Routes not generated for collection");
            done();
        });
    });

    describe('#webserver', function () {
        it('should have a webserver running on port 3000', function (done) {
            Plunge.listen({
                port: 3000,
                message: 'server running'
            });
            assert.strictEqual(3000, Plunge.app.get('port'), 'Port is not equal');
            done();
        });
        it('should exit the webserver', function (done) {
            console.log('Server disconnected')
            process.exit(0);
            done()
        });
    });
});
