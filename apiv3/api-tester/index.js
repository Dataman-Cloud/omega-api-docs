'use strict'

/**
 * Usage:  mocha index.js
 */

var SwaggerParser = require('swagger-parser');
var parser = new SwaggerParser();
var path = require('path');
var async = require('async');
var common = require('./common');

//var docPath = "https://raw.githubusercontent.com/Dataman-Cloud/omega-api-docs/master/api-doc.json";
var docPath = path.join(__dirname, '../api-doc.json');

// if host == false, use host in yaml
common.conf.host = "http://devforward.dataman-inc.net";
common.conf.wsHost = "ws://devstreaming.dataman-inc.net";

// auth: username and password
common.conf.authUser = "XXX@dataman-inc.com";
common.conf.authPass = "XXXXXXX";

before(function (done) {
    // parse yaml doc
    parser.dereference(docPath, function (err, api) {
        if (err) return done(err);
        common.conf.swaggerDef = api;
        done();
    })
});

async.series([
    require("./case/cluster"),
    require("./case/label"),
    require("./case/misc"),
    require("./case/user"),
    require("./case/app")
]);
