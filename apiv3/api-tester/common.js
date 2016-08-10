//exports.swaggerDef = undefined;
//exports.host = undefined;
//exports.authToken = undefined;
exports.conf = {
    swaggerDef: undefined,
    host: undefined,
    authUser: undefined,
    authPass: undefined,
    authToken:  "2387a68008324288b31d087459e2b32c",
    wsHost: undefined
};

exports.expect = require('chai').expect;
exports.hippie = require('./lib/hippie-swagger');
exports.swaggerHippie = function() {
    var result = undefined;
    if(exports.conf.host) {
        result = exports.hippie(exports.conf.swaggerDef, {host: exports.conf.host});
    } else {
        result = exports.hippie(exports.conf.swaggerDef);
    }

    if(exports.conf.authToken) {
        result = result.header("Authorization", exports.conf.authToken);
    }

    return result;
};
