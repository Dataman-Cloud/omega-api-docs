var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

var authApi = require("../api/auth");

module.exports = function(finalDone) {
    //newNodeId = "2e9790e8c4334f65b332a65f9553cca3";
    //newClusterId = 96;
    async.series([
        //function(callback) { authApi.authPost(callback) },
        //function(callback) { authApi.authGet(callback) },
        function(callback) { authDelete(callback) }
    ], finalDone);
};

