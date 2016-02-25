var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

module.exports = function(finalDone) {
    //newNodeId = "2e9790e8c4334f65b332a65f9553cca3";
    //newClusterId = 96;
    async.series([
        function(callback) { authTokenGet(callback) },
        function(callback) { userGet(callback) },
    ], finalDone);
};

function authTokenGet(finalDone) {
    describe("Cluster Auth Post", function () {
        it('GET Auth Token', function (done) {
            swaggerHippie()
                .post("/auth")
                .send({
                    "email": "123@123.com",
                    "password": "111111"
                })
                .expectStatus(200)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    common.conf.authToken = body.data.token;
                    done();
                    finalDone();
                });
        })
    });
}

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