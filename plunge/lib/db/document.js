var Document = {};

module.exports.bind = (function (schema) {
   Document.save(schema);
});

// TODO: implement eventdriven approach
Document.save = (function (schema) {
    schema.methods.save = (function (obj, callback) {
      obj.save(function (err) {
          if(err) callback(err);
          else {
              callback('success');
          }
      });
   });
});