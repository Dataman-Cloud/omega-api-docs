exports.swaggerDef = undefined;

exports.expect = require('chai').expect;
exports.hippie = require('./lib/hippie-swagger');
exports.swaggerHippie = function(options) {
    if(options && options.host) {
        return exports.hippie(exports.swaggerDef, options);
    } else {
        return exports.hippie(exports.swaggerDef);
    }
};
