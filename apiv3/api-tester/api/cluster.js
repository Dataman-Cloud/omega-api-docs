var async = require("async")
var common = require("../common");
var auth = require("./auth");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

var sshRun = require("../lib/ssh");
var wsRun = require("../lib/websocket");


var cData = {
    newClusterId: undefined,
    newNodeId: undefined
};

module.exports = {
    data: cData,
    clustersGet: clustersGet,
    clustersPost: clustersPost,
    clustersIdGet: clustersIdGet,
    clustersIdPatchRepair: clustersIdPatchRepair,
    clustersIdPatchUpgrade: clustersIdPatchUpgrade,
    clustersIdPut: clustersIdPut,
    clustersIdNewNodeIdGet: clustersIdNewNodeIdGet,
    clustersIdNodesPost: clustersIdNodesPost,
    sshInstall: sshInstall,
    clustersIdNodesIdGet: clustersIdNodesIdGet,
    clustersIdNodesIdPut: clustersIdNodesIdPut,
    clustersIdNodesIdMetricsGet: clustersIdNodesIdMetricsGet,
    agentWebsocket: agentWebsocket,
    glanceWebsocket: glanceWebsocket,
    clustersIdNodesIdServiceNamePatchRestart: clustersIdNodesIdServiceNamePatchRestart,
    clustersIdNodesIdServiceNamePatchReset: clustersIdNodesIdServiceNamePatchReset,
    clustersIdNodesDelete: clustersIdNodesDelete,
    clustersIdDelete: clustersIdDelete
};

function clustersGet(finalDone, statusCode) {
    describe("GET /custers", function() {
        it("get clusters' infos", function(done) {
            swaggerHippie()
                .get("/clusters")
                .end(function(err, res, body) {
                    if(err) throw err;
                    console.log(body.data[0])
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

function clustersPost(finalDone, statusCode) {
    describe("POST /clusters", function() {
        it("create new cluster", function(done) {
            swaggerHippie()
                .post("/clusters")
                .send({
                    "name": "autotest",
                    "clusterType": "1_master"
                })
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            expect(body.code).to.equal(0);
                            cData.newClusterId = body.data.id;
                            break;
                        case 401:
                            expect(body.code).to.equal(10002);
                            break;
                    }
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdDelete(finalDone, statusCode) {
    describe("DELETE /clusters", function() {
        it("delete cluster", function(done) {
            swaggerHippie()
                .del("/clusters/{cluster_id}")
                .pathParams({
                    cluster_id: cData.newClusterId
                }).end(function(err, res, body) {
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
                    finalDone();
                    done();
                });
        });
    });
}

function clustersIdGet(finalDone, statusCode) {
    describe("GET /clusters/{cluster_id}", function() {
        it("get a cluster's info", function(done) {
            swaggerHippie()
                .get("/clusters/{cluster_id}")
                .pathParams({
                    cluster_id: cData.newClusterId
                }).end(function(err, res, body) {
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
                    //clustersIdPatchRepair(finalDone, 200);
                    done();
                    finalDone();
                 });
        });
    });
}

function clustersIdPatchRepair(finalDone, statusCode) {
    describe("Clusters Patch", function() {
        it("repair cluster", function(done) {
            swaggerHippie()
                .patch("/clusters/{cluster_id}")
                .pathParams({
                    cluster_id: cData.newClusterId
                })
                .send({
                    method: 'repair'
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
                });
        });
    });
}

function clustersIdPatchUpgrade(finalDone, statusCode) {
    describe("Clusters Patch", function() {
        it("upgrade cluster", function(done) {
            swaggerHippie()
                .patch("/clusters/{cluster_id}")
                .pathParams({
                    cluster_id: cData.newClusterId
                })
                .send({
                    method: 'upgrade'
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
                    //clustersIdPut(finalDone, statusCode);
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdPut(finalDone, statusCode) {
    describe("/clusters/{cluster_id} Put", function() {
        it("modify cluster name", function(done) {
            swaggerHippie()
                .put("/clusters/{cluster_id}")
                .pathParams({
                    cluster_id: cData.newClusterId
                })
                .send({
                    name: "autotest100"
                })
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            break;
                        case 401:
                            expect(body.code).to.equal(10002);
                            break;
                    }
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdNodesDelete(finalDone, statusCode) {
    describe("/clusters/{cluster_id}/nodes Delete", function() {
        it("delete nodes in a cluster", function(done) {
            swaggerHippie()
                .del("/clusters/{cluster_id}/nodes")
                .pathParams({
                    cluster_id: cData.newClusterId
                })
                .send([cData.newNodeId])
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            break;
                        case 401:
                            expect(body.code).to.equal(10002);
                            break;
                    }
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdNodesPost(finalDone, statusCode) {
    describe("/clusters/{cluster_id}/nodes Post", function() {
        it("add a node in a cluster", function(done) {
            swaggerHippie()
                .post("/clusters/{cluster_id}/nodes")
                .pathParams({
                    cluster_id: cData.newClusterId
                })
                .send({
                    "id": cData.newNodeId,
                    "name": "server1",
                    "attributes": {
                        "gateway": false,
                        "proxy": false
                    }
                })
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            break;
                        case 401:
                            expect(body.code).to.equal(10002);
                            break;
                    }
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdNewNodeIdGet(finalDone, statusCode) {
    describe("/clusters/{cluster_id}/new_node_identifier Get", function() {
        it("Get new node id", function(done) {
            swaggerHippie()
                .get("/clusters/{cluster_id}/new_node_identifier")
                .pathParams({
                    cluster_id: cData.newClusterId
                })
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            cData.newNodeId = body.data.identifier;
                            break;
                        case 401:
                            expect(body.code).to.equal(10002);
                            break;
                    }
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdNodesIdGet(finalDone, statusCode) {
    describe("Get /clusters/{cluster_id}/nodes/{node_id}", function() {
        it("Get one node info", function(done) {
            swaggerHippie()
                .get("/clusters/{cluster_id}/nodes/{node_id}")
                .pathParams({
                    cluster_id: cData.newClusterId,
                    node_id: cData.newNodeId
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
                });
        });
    });
}

function clustersIdNodesIdPut(finalDone, statusCode) {
    describe("/clusters/{cluster_id}/nodes/{node_id} Put", function() {
        it("change the node's name", function(done) {
            swaggerHippie()
                .put("/clusters/{cluster_id}/nodes/{node_id}")
                .pathParams({
                    cluster_id: cData.newClusterId,
                    node_id: cData.newNodeId
                })
                .send({
                    "name": "after_change"
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
                    clustersIdNodesIdMetricsGet(finalDone, 200);
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdNodesIdMetricsGet(finalDone, statusCode) {
    describe("/clusters/{cluster_id}/nodes/{node_id}/metrics Get", function() {
        it("get the node's metrics", function(done) {
            swaggerHippie()
                .get("/clusters/{cluster_id}/nodes/{node_id}/metrics")
                .pathParams({
                    cluster_id: cData.newClusterId,
                    node_id: cData.newNodeId
                })
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            break;
                        case 401:
                            expect(body.code).to.equal(10002);
                            break;
                    }
                    done();
                    finalDone();
                });
        });
    });
}

function clustersIdNodesIdServiceNamePatchRestart(finalDone, statusCode) {
    describe("/clusters/{cluster_id}/nodes/{node_id}/services/{service_name} Patch", function() {
        it("restart the node's service", function(done) {
            swaggerHippie()
                .patch("/clusters/{cluster_id}/nodes/{node_id}/services/{service_name}")
                .pathParams({
                    cluster_id: cData.newClusterId,
                    node_id: cData.newNodeId,
                    service_name: 'zookeeper'
                })
                .send({
                    method: 'restart'
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
                });
        });
    });
}


function clustersIdNodesIdServiceNamePatchReset(finalDone, statusCode) {
    describe("/clusters/{cluster_id}/nodes/{node_id}/services/{service_name} Patch", function() {
        it("reset the node's service", function(done) {
            swaggerHippie()
                .patch("/clusters/{cluster_id}/nodes/{node_id}/services/{service_name}")
                .pathParams({
                    cluster_id: cData.newClusterId,
                    node_id: cData.newNodeId,
                    service_name: 'zookeeper'
                })
                .send({
                    method: 'reset'
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
                });
        });
    });
}


function glanceWebsocket(finalDone) {
    describe("Glance WS", function() {
        this.timeout(0);
        it("Glance", function(done) {
            wsRun(
                "ws://devstreaming.dataman-inc.net/streaming/glance/",
                common.conf.authToken,
                function() {
                    finalDone();
                    done();
                }
            );
        });
    });
}

function agentWebsocket(finalDone) {
    describe("Agent Websocket", function() {
        this.timeout(0);
        it("Agent", function(done) {
            wsRun(
                common.conf.wsHost + "/streaming/glance/",
                common.conf.authToken,
                function() {
                    done();
                    finalDone();
                }
            );
        });
    });
}

function sshInstall(sshConfig, finalDone) {
    describe("1_master", function() {
        this.timeout(0);
        it("install master", function(done) {
            var cmd = 'sudo -H DM_HOST=' + common.conf.wsHost + '/ OMEGA_ENV=dev ' +
                'bash -c "$(curl -Ls https://raw.githubusercontent.com/Dataman-Cloud/agent-installer/master/install-agent.sh)" -s ' +
                cData.newNodeId;
            sshRun(sshConfig, cmd,
                function() {
                    setTimeout(function() {
                    done();
                    finalDone();}, 10000);
                });
        })
    });
}
