var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

var cData = {
    newGroupId: undefined,
    newGroupName: 'group_test',
    newGroupDescription: 'group_description',
    active_code: undefined
};

module.exports = {
    data: cData,
    groupsGet: groupsGet,
    groupsPost: groupsPost,
    groupDelete: groupDelete,
    groupMemberGet: groupMemberGet,
    groupInviteMembers: groupInviteMembers,
    groupDeleteMembers: groupDeleteMembers,
    groupActivation: groupActivation
};

function groupsGet(finalDone, statusCode, active_code) {
    describe("GET /groups", function() {
        it("get groups' infos", function(done) {
            swaggerHippie()
                .get("/group")
                .end(function(err, res, body) {
                    if(err) throw err;
                    expect(res.statusCode).to.equal(statusCode);
                    switch(statusCode) {
                        case 200:
                            expect(body.code).to.equal(0);
                            //cData.clusterId = body.data[0].id;
                            //cData.nodeIds = [body.data[0].nodes[0].id];
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

function groupsPost(finalDone, statusCode) {
    describe("POST /groups", function() {
        it("Create a new group", function(done) {
            swaggerHippie()
                .post("/groups")
                .send({
                    "name": cData.newGroupName,
                    "description": cData.newGroupDescription
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
                    done();
                    finalDone();
                });
        });
    });
}

function groupDelete(finalDone, labelId) {
    describe("DELETE /groups/{group_id}", function () {
        it('delete labels', function (done) {
            swaggerHippie()
                .del("/groups/{group_id}")
                .pathParams({
                    group_id: cData.newGroupId
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

function GroupLeave(finalDone) {
    describe("DELETE /groups/{group_id}/mymemberships", function () {
        it('leave group', function (done) {
            swaggerHippie()
                .del("/groups/{group_id}/mymemberships")
                .pathParams({
                    group_id: cData.newGroupId
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

function groupDeleteMembers(finalDone) {
    describe("DELETE /groups/{group_id}/memberships", function () {
        it('Delete group\'s members', function (done) {
            swaggerHippie()
                .del("/groups/{group_id}/memberships")
                .pathParams({
                    "group_id": cData.newGroupId
                }).send({
                    users: []
                }).expectStatus(200)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    done();
                    finalDone();
                });
        });
    });
}

function groupMemberGet(finalDone) {
    describe("GET /groups/{group_id}/memberships", function () {
        it("get groups' members", function (done) {
            swaggerHippie()
                .get("/groups/{group_id}/memberships")
                .pathParams({
                    group_id: cData.newGroupId
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

function groupInviteMembers(finalDone) {
    describe("POST /groups/{group_id}/memberships", function () {
        it("Invite members", function (done) {
            swaggerHippie()
                .post("/groups/{group_id}/memberships")
                .pathParams({
                    group_id: cData.newGroupId
                })
                .send({
                    "emails": [
                        "string"
                    ]
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

function groupActivation(finalDone) {
    describe("PUT /groups/activation/{active_code}", function () {
        it("group invite activation", function (done) {
            swaggerHippie()
                .get("/groups/activation/{active_code}")
                .pathParams({
                    active_code: cData.active_code
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
