var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

var finalCallback;

var auth;
var authHippie = function() {
    return swaggerHippie().header("Authorization", auth);
};

function get_identifier() {
    describe("Identifier Get", function() {
        it("get identifier", function(done) {
            authHippie()
                .get("/cluster/{clusterId}/node/identifier")
                .pathParams({
                    clusterId: 422
                }).expectStatus(200).end(function(err, res, body) {
                    if(err) throw err;
                    done();
                })
        });
    });
}

function post_cluster() {
    describe("Cluster Post", function() {
        this.timeout(5000);
        it("creat new cluster", function(done) {
            swaggerHippie()
                .post("/cluster")
                .header("Authorization", auth)
                .send({
                    "name": "test",
                    "clusterType": "1_master"
                }).end(function(err, res, body) {
                    //console.log(body)
                    if(err) throw err;
                    expect(body.code).to.equal(1);
                    expect(body.errors.name).to.equal("集群名已存在");
                    finalCallback();
                    done();
                });
        });
    })
}

function get_clusters() {
    describe("Custer Get", function() {
        it("get clusters' infos", function(done) {
            swaggerHippie({"host": "http://devforward.dataman-inc.net"})
                .get("/clusters")
                .header("Authorization", auth)
                .end(function(err, res, body) {
                    //if(err) throw err;
                    post_cluster();
                    done();
                })
        }) ;
    });
}

module.exports = function(callback) {
    finalCallback = callback;

    describe("Cluster Auth", function () {
        this.timeout(0);
        it('Auth', function (done) {
            hippie(common.swaggerDef, {"host": "http://devforward.dataman-inc.net"})
                .post("/auth")
                .send({
                    "email": "lhfu@dataman-inc.com",
                    "password": "A87654321"
                })
                .expectStatus(200)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err
                    auth = body.data.token;
                    expect(body.code).to.equal(0);

                    switch(0) {
                        case 0:
                            // test clusters
                            get_clusters();
                            done();
                            break;
                        case 1:
                            // test websocket
                            require("../examples/websocket")(auth, done);
                            break;
                        case 2:
                            require("../examples/ssh")(done);
                            break;
                    }
                });
        })
    });
};
