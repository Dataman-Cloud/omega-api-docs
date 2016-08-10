var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

var authApi = require("../api/auth");
var usersApi = require("../api/users");

module.exports = function(finalDone) {
    async.series([
        function(callback) { authApi.authPost(callback) },
        function(callback) { usersApi.usersGet(callback) },
        //function(callback) { usersApi.usersPost(callback) },
        function(callback) { usersApi.usersIdGet(callback) },
        function(callback) { usersApi.usersPatch(callback) },
        function(callback) { usersApi.usersPut(callback) }

    ], finalDone);
};

