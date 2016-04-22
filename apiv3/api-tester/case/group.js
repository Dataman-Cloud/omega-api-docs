var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var expect = common.expect;

var authApi = require("../api/auth");
var groupApi = require("../api/label");

var active_code = undefined;

var member = {
    email: "lhfu@xxx.com",
    password: "A87654321"
};

var adminAuthToken = undefined;
var memberAuthToken = undefined;



module.exports = {
    firstPart: firstPart,
    secondPart: secondPart
};


function firstPart(finalDone) {
    async.series([
        function (callback) {
            authApi.authPost(callback, function (body) {
                adminAuthToken = body.data.token;
            })
        },
        function (callback) {
            common.conf.authUser = member.email;
            common.conf.authPass = member.password;
            authApi.authPost(callback, function (body) {
                memberAuthToken = body.data.token
            });
        },
        function (callback) {
            common.conf.authToken = adminAuthToken;
            callback();
        },
        function (callback) {
            groupApi.groupsPost(callback, 200)
        },
        function (callback) {
            groupApi.groupsGet(callback, 200)
        },
        function (callback) {
            groupApi.groupMemberGet(callback)
        },
        function (callback) {
            groupApi.groupInviteMembers(callback)
        }
    ], finalDone);
}

function secondPart(finalDone) {
    async.series([
        function (callback) {
            common.conf.authToken = memberAuthToken;
            callback();
        },
        function(callback) { groupApi.groupActivation(callback, 200, active_code)},
        function (callback) {
            common.conf.authToken = adminAuthToken;
            callback();
        },
        function(callback) { groupApi.groupDeleteMembers(callback) },
        function(callback) { groupApi.groupDelete(callback, 200) }
    ], finalDone);
}
