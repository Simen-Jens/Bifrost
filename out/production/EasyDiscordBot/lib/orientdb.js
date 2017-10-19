// Create a new instance of the Java object.
var bean = __.newBean('orient.OrientBean');

// Exports config function.
exports.config = function (hostname, username, password) {
    // Call the Java method.
    var obj = bean.config(hostname, username, password);
};

// Exports query function.
exports.query = function (className, statement) {
    // Call the Java method.
    var obj = bean.query(className, statement);
    return obj;
};