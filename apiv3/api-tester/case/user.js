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
        function(callback) { authApi.authPost(callback) },
        function(callback) { userGet(callback) }
    ], finalDone);
};

function userGet(finalDone) {
    describe("GET /user", function () {
        it('GET User Info', function (done) {
            swaggerHippie()
                .get("/user")
                .expectStatus(200)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    done();
                    finalDone();
                });
        })
    });
}
