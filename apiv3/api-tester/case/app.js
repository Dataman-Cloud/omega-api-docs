var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

module.exports = function(finalDone) {
    async.series([
        function(callback) { authTokenGet(callback) },
        function(callback) { appsGet(callback) },
        function(callback) { clustersClustersIdAppsGET(callback) },
        function(callback) { clustersClustersIdAppsPOST(callback) },
        function(callback) { clustersClustersIdAppsAppIdGET(callback) },
        function(callback) { clustersClustersIdAppsAppIdPUT(callback) },
        function(callback) { clustersClustersIdAppsAppIdPATCH(callback) },
        function(callback) { clustersClustersIdAppsAppIdDELETE(callback) },
        function(callback) { clustersClustersIdAppsAppIdEventsGET(callback) },
        function(callback) { clustersClustersIdAppsAppIdVersionsGET(callback) },
        function(callback) { clustersClustersIdAppsAppIdVersionsVersionIdDELETE(callback) },
    ], finalDone);
};

// global variable definitions
var newClusterId = 1;
var newAppId = 1;
var newVersionID = 1;

// global structure definitions
var appRequestBody = {
  name: "test app",
  instances: 3,
  volumes: [{
    hostPath: "/var/tmp/hostPath",
    containerPath: "/var/tmp/containerPath"}
  ],
  portMappings: [
    {appPort:  8080,
      protocol: "http",
      isUri: true,
      type: "",
      mapPort: 8080,
      uri: "unix:///xxxxxx.sock" }
  ],
  cpus: 0.2,
  mem: 0.3,
  cmd: "run.sh",
  envs: [{PATH: "/usr/bin", MYSQL_PASS: "123"}],
  imageName: "flappybird2048",
  imageVersion: "ghug23tfe",
  network: "host",
  constraints: [""] };

var appResponseBody = {};
var eventsResponseBody = {};
var versionsResponseBod = {};

function authTokenGet(finalDone) {
  describe("Cluster Auth Post", function () {
    it('GET Auth Token', function (done) {
      swaggerHippie()
      .post("/auth")
      .send({
        "email": "admin@shurenyun.com",
        "password": "dataman1234"
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


// GET /apps
function appsGet(finalDone) {
  describe("[app] get apps belongs to user", function () {
    it('GET /apps', function (done) {
      swaggerHippie()
      .get("/apps")
      .expectStatus(200)
      .expectValue("code", 0)
      .end(function (err, res, body) {
        if(err) throw err;
        expect(body.length).to.equal(0)
        done();
        finalDone();
      });
    })
  });
}


// GET /clusters/:cluster_id/apps
function clustersClustersIdAppsGET(finalDone) {
  describe("[app] GET apps belongs to specific cluster", function () {
    it('GET /clusters/:cluster_id/apps', function (done) {
      swaggerHippie()
      .get("/clusters/{cluster_id}/apps")
      .pathParams({cluster_id: newClusterId})
      .expectStatus(200)
      .expectValue("code", 0)
      .end(function (err, res, body) {
        if(err) throw err;
        done();
        finalDone();
      });
    })
  });
}

// POST /clusters/:cluster_id/apps
function clustersClustersIdAppsPOST(finalDone) {
  describe("[app] POST create new app under cluster clusterId", function () {
    it('POST /clusters/:cluster_id/apps', function (done) {
      swaggerHippie()
      .post("/clusters/{cluster_id}/apps")
      .pathParams({cluster_id: newClusterId})
      .send(appRequestBody)
      .expectStatus(200)
      .expectValue("code", 0)
      .end(function (err, res, body) {
        if(err) throw err;
        done();
        finalDone();
      });
    })
  });
}

// GET /clusters/:cluster_id/apps/:app_id
function clustersClustersIdAppsAppIdGET(finalDone) {
  describe("[app] GET an app with app_id under cluster_id", function () {
    it('GET /clusters/cluster_id/apps/:app_id', function (done) {
      swaggerHippie()
      .get("/clusters/{cluster_id}/apps/{app_id}")
      .pathParams({cluster_id: newClusterId}, {app_id: newAppId})
      .expectStatus(200)
      .expectValue("code", 0)
      .end(function (err, res, body) {
        if(err) throw err;
        done();
        finalDone();
      });
    })
  });
}


// PUT /clusters/:cluster_id/apps/:app_id
function clustersClustersIdAppsAppIdPUT(finalDone) {
  describe("[app] PUT update an app under cluster_id", function () {
    it('PUT /clusters/:cluster_id/apps/:app_id', function (done) {
      swaggerHippie()
      .put("/clusters/{cluster_id}/apps/{app_id}")
      .send(appRequestBody)
      .expectStatus(200)
      .expectValue("code", 0)
      .end(function (err, res, body) {
        if(err) throw err;
        done();
        finalDone();
      });
    })
  });
}

// PATCH /clusters/:cluster_id/apps/:app_id
function clustersClustersIdAppsAppIdPATCH(finalDone) {
  describe("[app] PATCH update an app under cluster_id, commonly used for change status", function () {
    it('PATCH /clusters/:cluster_id/apps/:app_id', function (done) {
      swaggerHippie()
      .patch("/clusters/{cluster_id}/apps/{app_id}")
      .send(appRequestBody)
      .expectStatus(200)
      .expectValue("code", 0)
      .end(function (err, res, body) {
        if(err) throw err;
        done();
        finalDone();
      });
    })
  });
}

// DELETE /clusters/:cluster_id/apps/:app_id
function clustersClustersIdAppsAppIdDELETE(finalDone) {
  describe("[app] DELETE remove an app under cluster id", function () {
    it('DELETE remove an app', function (done) {
      swaggerHippie()
      .delete("/clusters/{cluster_id}/apps/{app_id}")
      .pathParams({cluster_id: newClusterId}, {app_id: newAppId})
      .expectStatus(200)
      .expectValue("code", 0)
      .end(function (err, res, body) {
        if(err) throw err;
        done();
        finalDone();
      });
    })
  });
}


// GET /clusters/:cluster_id/apps/:app_id/events
function clustersClustersIdAppsAppIdEventsGET(finalDone) {
  describe("[app] get events reported by an app", function () {
    it('GET /clusters/:cluster_id/apps/:app_id/events', function (done) {
      swaggerHippie()
      .get("/clusters/{cluster_id}/apps/{app_id}/events")
      .pathParams({cluster_id: newClusterId}, {app_id: newAppId})
      .expectStatus(200)
      .expectValue("code", 0)
      .end(function (err, res, body) {
        if(err) throw err;
        done();
        finalDone();
      });
    })
  });
}


// GET /clusters/:cluster_id/apps/:app_id/versions
function clustersClustersIdAppsAppIdVersionsGET(finalDone) {
  describe("[app] get versions belongs to an app", function () {
    it('GET /clusters/:cluster_id/apps/:app_id/versions', function (done) {
      swaggerHippie()
      .get("/clusters/{cluster_id}/apps/{app_id}/versions")
      .pathParams({cluster_id: newClusterId}, {app_id: newAppId})
      .expectStatus(200)
      .expectValue("code", 0)
      .end(function (err, res, body) {
        if(err) throw err;
        done();
        finalDone();
      });
    })
  });
}


// DELETE /clusters/:cluster_id/apps/:app_id/versions/:version_id
function clustersClustersIdAppsAppIdVersionsVersionIdDELETE(finalDone) {
  describe("[app] delete version belongs to an app", function () {
    it('DELETE /clusters/:cluster_id/apps/:app_id/versions/:version_id', function (done) {
      swaggerHippie()
      .delete("/clusters/{cluster_id}/apps/{app_id}/versions/{version_id}")
      .pathParams({cluster_id: newClusterId}, {app_id: newAppId}, {version_id: newVersionId})
      .expectStatus(200)
      .expectValue("code", 0)
      .end(function (err, res, body) {
        if(err) throw err;
        done();
        finalDone();
      });
    })
  });
}
