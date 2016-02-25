var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

var sshRun = require("../lib/ssh");
var wsRun = require("../lib/websocket");
var sshConfig = {
    host:"127.0.0.1",
    port: "22",
    user: "root",
    pass: "a87654321"
};


var newClusterId;
var newNodeId;

module.exports = function(finalDone) {
    //newNodeId = "2e9790e8c4334f65b332a65f9553cca3";
    //newClusterId = 96;
    async.series([
        function(callback) { authTokenGet(callback) },
        function(callback) { clustersGet(callback, 200) },
        function(callback) { clustersPost(callback, 200) },
        function(callback) { clustersIdGet(callback, 200) },
        function(callback) { clustersIdPatchRepair(callback, 200) },
        function(callback) { clustersIdPatchUpgrade(callback, 200) },
        function(callback) { clustersIdPut(callback, 200) },
        function(callback) { clustersIdNewNodeIdGet(callback, 200) },
        function(callback) { clustersIdNodesPost(callback, 200) },
        function(callback) { sshInstall(callback) },
        function(callback) { clustersIdNodesIdGet(callback, 200) },
        function(callback) { clustersIdNodesIdPut(callback, 200) },
        function(callback) { clustersIdNodesIdMetricsGet(callback, 200) },
        function(callback) { agentWebsocket(callback) },
        function(callback) { clustersIdNodesIdServiceNamePatchRestart(callback, 200) },
        function(callback) { clustersIdNodesIdServiceNamePatchReset(callback, 200) },
        function(callback) { clustersIdNodesDelete(callback, 200) },
        function(callback) { clustersIdDelete(callback, 200) },
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

function clustersGet(finalDone, statusCode) {
    describe("Custers Get", function() {
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
    describe("Clusters Post", function() {
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
                            newClusterId = body.data.id;
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
    describe("Clusters Delete", function() {
        it("delete cluster", function(done) {
            swaggerHippie()
                .del("/clusters/{cluster_id}")
                .pathParams({
                    cluster_id: newClusterId
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
                    cluster_id: newClusterId
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
                    cluster_id: newClusterId
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
                    cluster_id: newClusterId
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
                    cluster_id: newClusterId
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
                    cluster_id: newClusterId
                })
                .send([newNodeId])
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
                    cluster_id: newClusterId
                })
                .send({
                    "id": newNodeId,
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
                    cluster_id: newClusterId
                })
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            newNodeId = body.data.identifier;
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
    describe("/clusters/{cluster_id}/nodes/{node_id} Get", function() {
        it("Get one node info", function(done) {
            swaggerHippie()
                .get("/clusters/{cluster_id}/nodes/{node_id}")
                .pathParams({
                    cluster_id: newClusterId,
                    node_id: newNodeId
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
                    cluster_id: newClusterId,
                    node_id: newNodeId
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
                    cluster_id: newClusterId,
                    node_id: newNodeId
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
                    cluster_id: newClusterId,
                    node_id: newNodeId,
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
                    cluster_id: newClusterId,
                    node_id: newNodeId,
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

function sshInstall(finalDone) {
    describe("1_master", function() {
        this.timeout(0);
        it("install master", function(done) {
            var cmd = 'sudo -H DM_HOST=' + common.conf.wsHost + '/ OMEGA_ENV=dev ' +
                'bash -c "$(curl -Ls https://raw.githubusercontent.com/Dataman-Cloud/agent-installer/master/install-agent.sh)" -s ' +
                newNodeId;
            sshRun(sshConfig, cmd,
                function() {
                    setTimeout(function() {
                    done();
                    finalDone();}, 10000);
                });
        })
    });
}