'use strict'

/**
 * Example for demonstrating hippie-swagger usage, including dereferencing
 *
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
common.conf.host = "http://192.168.99.100:8000";
common.conf.wsHost = "ws://192.168.99.100:8000";


before(function (done) {
    // if using mocha, dereferencing can be performed prior during initialization via the delay flag:
    // https://mochajs.org/#delayed-root-suite
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
