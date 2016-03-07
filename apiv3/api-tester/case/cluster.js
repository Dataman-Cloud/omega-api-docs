var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var expect = common.expect;

var clusterApi = require("../api/cluster");
var authApi = require("../api/auth");

/* simple-ssh 配置 */
var sshConfig = {
    host: "127.0.0.1",
    port: "22",
    user: "root",
    pass: "a87654321"
};

module.exports = function(finalDone) {
    //newNodeId = "2e9790e8c4334f65b332a65f9553cca3";
    //newClusterId = 96;
    async.series([
        function(callback) { authApi.authPost(callback) },
        function(callback) { clusterApi.clustersGet(callback, 200) },
        function(callback) { clusterApi.clustersPost(callback, 200) },
        function(callback) { clusterApi.clustersIdGet(callback, 200) },
        function(callback) { clusterApi.clustersIdPatchRepair(callback, 200) },
        function(callback) { clusterApi.clustersIdPatchUpgrade(callback, 200) },
        function(callback) { clusterApi.clustersIdPut(callback, 200) },
        function(callback) { clusterApi.clustersIdNewNodeIdGet(callback, 200) },
        function(callback) { clusterApi.clustersIdNodesPost(callback, 200) },
        function(callback) { clusterApi.sshInstall(sshConfig, callback) },
        function(callback) { clusterApi.clustersIdNodesIdGet(callback, 200) },
        function(callback) { clusterApi.clustersIdNodesIdPut(callback, 200) },
        function(callback) { clusterApi.clustersIdNodesIdMetricsGet(callback, 200) },
        function(callback) { clusterApi.agentWebsocket(callback) },
        function(callback) { clusterApi.clustersIdNodesIdServiceNamePatchRestart(callback, 200) },
        function(callback) { clusterApi.clustersIdNodesIdServiceNamePatchReset(callback, 200) },
        function(callback) { clusterApi.clustersIdNodesDelete(callback, 200) },
        function(callback) { clusterApi.clustersIdDelete(callback, 200) },
    ], finalDone);
};
