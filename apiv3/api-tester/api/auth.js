/*
* auth 不好测，暂时人工测
* authPost被其它文件调用
*/
var async = require("async")
var common = require("../common");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

var newActivateCode;


module.exports = {
    authPost: authPost
};

function authDelete(finalDone) {
    describe("auth delete", function() {
        it("logout", function(done) {
            swaggerHippie()
                .del("/auth")
                .end(function (err, res, body) {
                    if(err) throw err;
                    expect(body.code).to.equal(0);
                    done();
                    finalDone();
                });
        });
    });
}

function authGet(finalDone) {
    describe("auth get", function() {
        it("logout", function(done) {
            swaggerHippie()
                .get("/auth")
                .expectStatus(200)
                .expectValue('code', 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    expect(body.code).to.equal(0);
                    done();
                    finalDone();
                });
        });
    });
}

function authPost(finalDone, storeCallback) {
    describe("Post /auth", function() {
        it("login", function(done) {
            swaggerHippie()
                .post("/auth")
                .send({
                    "name": common.conf.authUser,
                    "password": common.conf.authPass
                })
                .expectStatus(201)
                .expectValue("code", 0)
                .end(function (err, res, body) {
                    if(err) throw err;
                    storeCallback ? storeCallback(body) : common.conf.authToken = body.data.token;
                    done();
                    finalDone();
                });
        })
    });
}

function authUserRegistrationPost(finalDone) {
    describe("Post /auth/user/registration", function() {
        it("register", function(done) {
            swaggerHippie()
                .post("/auth/user/registration")
                .send({
                    "email": "123@123.com",
                    "password": "111111",
                    "company": "dataman",
                    "wechat_qq": "dataman"
                })
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

function authUserActivationPost(finalDone) {
    describe("Post /auth/user/activation", function() {
        it("send activation email", function(done) {
            swaggerHippie()
                .post("/auth/user/activation")
                .send({
                    email: "123@123.com"
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

function authUserActivationCodePut(finalDone) {
    describe("Put /auth/user/activation/{activate_code}", function() {
        it("check activate code", function(done) {
            swaggerHippie()
                .put("/auth/user/activation/{activate_code}")
                .pathParams({
                    activate_code: newActivateCode
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

function authPasswordReseturlPost(finalDone) {
    describe("POST /auth/password/reseturl", function() {
        it("send email: reset password", function(done) {
            swaggerHippie()
                .post("/auth/password/reseturl")
                .send({
                    email: "123@123.com"
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

function authPasswordResetCodeGet(finalDone) {
    describe("GET /auth/password/{reset_code}", function() {
        it("check password reset code", function(done) {
            swaggerHippie()
                .get("/auth/password/{reset_code}")
                .pathParams({
                    reset_code: newResetCode
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

function authPasswordResetCodePut(finalDone) {
    describe("PUT /auth/password/{reset_code}", function() {
        it("check password reset code", function(done) {
            swaggerHippie()
                .put("/auth/password/{reset_code}")
                .pathParams({
                    reset_code: newResetCode
                })
                .send({
                    "new_password": "111111",
                    "new_password_compare": "111111"
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
