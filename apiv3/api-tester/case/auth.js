var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

var authApi = require("../api/auth");

module.exports = function(finalDone) {
    async.series([
        function(callback) { authApi.authPost(callback) },
        // need to check object
        //function(callback) { authApi.authDelete(callback) },
        function(callback) { authApi.authGet(callback) },
    ], finalDone);
};

