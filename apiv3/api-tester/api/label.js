var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

var cData = {
    clusterId: undefined,
    nodeIds: [],
    newLabelId: undefined,
    newLabelName: 'redis_test'
};

module.exports = {
    data: cData,
    clustersGet: clustersGet,
    labelsPost: labelsPost,
    labelsGet: labelsGet,
    clustersIdNodesLabelsPost: clustersIdNodesLabelsPost,
    clustersIdNodesByLabelsGet: clustersIdNodesByLabelsGet,
    clustersIdNodesLabelsDelete: clustersIdNodesLabelsDelete,
    labelsDelete: labelsDelete,
    clustersIdGet: clustersIdGet
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
                            cData.clusterId = body.data[0].id;
                            cData.nodeIds = [body.data[0].nodes[0].id];
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
                    cluster_id: cData.clusterId
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
                .send([cData.newLabelId])
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
                    if(labelItem.name == cData.newLabelName) {
                        cData.newLabelId = labelItem.id;
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
                    "name": cData.newLabelName
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
                    cluster_id: cData.clusterId
                })
                .send({
                    "nodes": cData.nodeIds,
                    "labels": [cData.newLabelId]
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
                    cluster_id: cData.clusterId
                })
                .send({
                    "nodes": cData.nodeIds,
                    "labels": [cData.newLabelId]
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
                    cluster_id: cData.clusterId
                })
                .qs({
                    label_ids: [cData.newLabelId].join(",")
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
