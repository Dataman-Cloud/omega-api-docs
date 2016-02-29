var async = require("async")
var common = require("../common");
var auth = require("./auth");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;


var clusterId;
var nodeIds = [];
var newLabelId;
var newLabelName = 'redis_test';

module.exports = function(finalDone) {
    async.series([
        function(callback) { auth.authPost(callback) },
        function(callback) { clustersGet(callback, 200) },
        function(callback) { labelsPost(callback, newLabelName) },
        function(callback) { labelsGet(callback) },
        function(callback) { clustersIdNodesLabelsPost(callback) },
        function(callback) { clustersIdNodesByLabelsGet(callback) },
        function(callback) { clustersIdNodesLabelsDelete(callback)},
        function(callback) { labelsDelete(callback) },
        function(callback) { clustersIdGet(callback, 200) }
    ], finalDone);
};

function clustersGet(finalDone, statusCode) {
    describe("Custers Get", function() {
        it("get clusters' infos", function(done) {
            swaggerHippie()
                .get("/clusters")
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            expect(body.code).to.equal(0);
                            clusterId = body.data[0].id;
                            nodeIds = [body.data[0].nodes[0].id];
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

function clustersIdGet(finalDone, statusCode) {
    describe("GET /clusters/{cluster_id}", function() {
        it("get a cluster's info", function(done) {
            swaggerHippie()
                .get("/clusters/{cluster_id}")
                .pathParams({
                    cluster_id: clusterId
                }).end(function(err, res, body) {
                    if(err) throw err;
                    console.log(body.data.nodes[0].node_labels)
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            expect(body.code).to.equal(0);
                            break;
                        case 401:
                            expect(body.code).to.equal(10002);
                            break;
                    }
                    //clustersIdPatchRepair(finalDone, 200);
                    done();
                    finalDone();
                });
        });
    });
}

function labelsDelete(finalDone, labelId) {
    describe("DELETE /labels", function () {
        it('delete labels', function (done) {
            swaggerHippie()
                .del("/labels")
                .send([newLabelId])
                .expectStatus(200)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    done();
                    finalDone();
                });
        });
    });
}

function labelsGet(finalDone) {
    describe("GET /labels", function () {
        it('get label list', function (done) {
            swaggerHippie()
                .get("/labels")
                .expectStatus(200)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    var labelItem = body.data.slice(-1)[0];
                    if(labelItem.name == newLabelName) {
                        newLabelId = labelItem.id;
                    }
                    done();
                    finalDone();
                });
        });
    });
}

function labelsPost(finalDone) {
    describe("POST /labels", function () {
        it('submit a label', function (done) {
            swaggerHippie()
                .post("/labels")
                .send({
                    "name": newLabelName
                })
                .expectStatus(200)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdNodesLabelsDelete(finalDone) {
    describe("DELETE /clusters/{cluster_id}/nodes/labels", function () {
        it("delete nodes' labels", function (done) {
            swaggerHippie()
                .del("/clusters/{cluster_id}/nodes/labels")
                .pathParams({
                    cluster_id: clusterId
                })
                .send({
                    "nodes": nodeIds,
                    "labels": [newLabelId]
                })
                .expectStatus(200)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdNodesLabelsPost(finalDone) {
    describe("POST /clusters/{cluster_id}/nodes/labels", function () {
        it("set nodes' labels", function (done) {
            swaggerHippie()
                .post("/clusters/{cluster_id}/nodes/labels")
                .pathParams({
                    cluster_id: clusterId
                })
                .send({
                    "nodes": nodeIds,
                    "labels": [newLabelId]
                })
                .expectStatus(200)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdNodesByLabelsGet(finalDone) {
    describe("GET /clusters/{cluster_id}/nodes by label_ids", function () {
        it("get labels' nodes", function (done) {
            swaggerHippie()
                .get("/clusters/{cluster_id}/nodes")
                .pathParams({
                    cluster_id: clusterId
                })
                .qs({
                    label_ids: [newLabelId].join(",")
                })
                .expectStatus(200)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    done();
                    finalDone();
                });
        });
    });
}