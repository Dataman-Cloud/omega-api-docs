'use strict'

/**
 * Example for demonstrating hippie-swagger usage, including dereferencing
 *
 * Usage:  mocha example/index.js
 */

var SwaggerParser = require('swagger-parser');
var parser = new SwaggerParser();
var path = require('path');
var async = require('async');
var common = require('./common');

//var docPath = "https://raw.githubusercontent.com/Dataman-Cloud/omega-api-docs/master/api-doc.json";
var docPath = path.join(__dirname, '../api-doc.json');

before(function (done) {
    // if using mocha, dereferencing can be performed prior during initialization via the delay flag:
    // https://mochajs.org/#delayed-root-suite
    parser.dereference(docPath, function (err, api) {
        if (err) return done(err);
        common.swaggerDef = api;
        done();
    })
});

async.series([
    require("./case/example")
]);
