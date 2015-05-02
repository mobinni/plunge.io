var Collections = [];
module.exports = (function () {
    return Collections;
})();

module.exports.add = (function (collection) {
    if (Collections.indexOf(collection) <= -1) {
        return Collections.push(collection);
    } else {
        var error = new Error('Duplicate collection definition');
        console.log(error)
    }
});
