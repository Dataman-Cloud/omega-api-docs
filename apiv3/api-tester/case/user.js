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
		function(callback) { authApi.authDelete(callback) }
        function(callback) { authDelete(callback) }
    ], finalDone);
};

function userGet(finalDone) {
    describe("GET /user", function () {
        it('GET User Info', function (done) {
            swaggerHippie()
                .header("Authorization", "cdscd").get("/user")
                .expectStatus(201)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    done();
                    finalDone();
                });
        })
    });
}

function authDelete(finalDone) {
     describe("auth delete", function() {
         it("logout", function(done) {
             swaggerHippie()
                 .header("Authorization", "cdscd")
				 .del("/auth")
                 .end(function (err, res, body) {
                     if(err) throw err;
					 console.log(body)
                     expect(body.code).to.equal(0);
                     done();
                     finalDone();
                 });
         });
     });
 }
