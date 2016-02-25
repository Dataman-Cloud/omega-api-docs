var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;


module.exports = function(finalDone) {
    async.series([
        function(callback) { authTokenGet(callback) },
        function(callback) { customerServiceGet(callback, 200) },
        function(callback) { noticeGet(callback, 200) }
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

function customerServiceGet(finalDone, statusCode) {
    describe("GET /customerservice_url", function() {
        it("Single Sign On", function(done) {
            swaggerHippie()
                .get("/customerservice_url")
                .qs({
                    return_to: "www.dataman-inc.com"
                })
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            expect(body.code).to.equal(0);
                            break;
                        case 401:
                            expect(body.code).to.equal(10002);
                            break;
                    }
                    done();
                    finalDone();
                })
        }) ;
    });
}

function noticeGet(finalDone, statusCode) {
    describe("GET /notice", function() {
        it("system notice", function(done) {
            common.conf.authToken = undefined;
            swaggerHippie()
                .get("/notice")
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            expect(body.code).to.equal(0);
                            break;
                        case 401:
                            expect(body.code).to.equal(10002);
                            break;
                    }
                    done();
                    finalDone();
                })
        }) ;
    });
}
