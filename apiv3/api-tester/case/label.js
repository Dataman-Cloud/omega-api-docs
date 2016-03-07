var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var expect = common.expect;

var authApi = require("../api/auth");
var labelApi = require("../api/label");

module.exports = function(finalDone) {
    async.series([
        function(callback) { authApi.authPost(callback) },
        function(callback) { labelApi.clustersGet(callback, 200) },
        function(callback) { labelApi.labelsPost(callback) },
        function(callback) { labelApi.labelsGet(callback) },
        function(callback) { labelApi.clustersIdNodesLabelsPost(callback) },
        function(callback) { labelApi.clustersIdNodesByLabelsGet(callback) },
        function(callback) { labelApi.clustersIdNodesLabelsDelete(callback)},
        function(callback) { labelApi.labelsDelete(callback) },
        function(callback) { labelApi.clustersIdGet(callback, 200) }
    ], finalDone);
};
