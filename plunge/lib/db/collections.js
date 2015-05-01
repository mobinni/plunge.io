var Collections = [];
module.exports.get = (function () {
   return Collections;
});
module.exports.add = (function (Collection) {
    return Collections.push(Collection);
});
