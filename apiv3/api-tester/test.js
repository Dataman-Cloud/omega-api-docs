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
common.conf.host = "http://demoforward.dataman-inc.net";
common.conf.wsHost = "ws://demostreaming.dataman-inc.net";

// auth: username and password
common.conf.authUser = "admin";
common.conf.authPass = "Dataman1234";


var REPLACE_OBJECTS = {
    "role": ["string", "null"],
    "updated_at": ["string", "null"],
    "group_id": ["integer", "null"]
};

var REPLACE_KEYS = Object.keys(REPLACE_OBJECTS);

function recurReplace(obj) {
    if(typeof obj == "object") {
        if(Array.isArray(obj)) {
            for(var i in obj) {
                recurReplace(i);
            }
        } else {
            for (var i in obj) {
                if(REPLACE_KEYS.indexOf(i) >= 0) {
                    obj[i]["type"] = REPLACE_OBJECTS[i]
                } else {
                    recurReplace(obj[i]);
                }
            }
        }
    }
}

before(function (done) {
    // parse yaml doc
    parser.dereference(docPath, function (err, api) {
        if (err) return done(err);
        recurReplace(api);
        common.conf.swaggerDef = api;
        done();
    })
});

async.series([
    /* 集群测试。 如果要测，需要在case/cluster.js里配置机器ssh信息，否则注释此行。 */
    //require("./case/cluster"),
    /* 标签测试， 需要有node的集群 */
    //require("./case/label"),
    //require("./case/misc"),
    //require("./case/user"),
    require("./case/auth"),
    //require("./case/app"),
    /* 用户组测试， 需要在case/group.js中配置成员用户
     * 分两部分，第一部分到成员用获取验证码
     * 获取验证码后在case/group.js中配置，再运行第二部分
     */
    //require("./case/group").firstPart,
    //require("./case/group").secondPart
]);
