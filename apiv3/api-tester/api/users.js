var async = require("async")
var common = require("../common");
var auth = require("./auth");
var hippie = common.hippie;
var swaggerHippie = common.swaggerHippie;
var expect = common.expect;

module.exports = {
    usersGet: usersGet,
    usersPost: usersPost,
    usersIdGet: usersIdGet,
    usersPatch: usersPatch,
    usersPut: usersPut
};

var range=function(len)
{
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};


function usersGet(finalDone) {
    describe("列出所有用户,默认获取前20条", function() {
        it("/users get", function(done) {
            swaggerHippie()
                .get("/users")
                .qs({
                    page: 1,
                    per_page: 20
                 })
                .expectStatus(200)
                .expectValue('code', 0)
                .end(function (err, res, body) {
                    //console.log(body)
					//if(err) throw err;
                    expect(body.code).to.equal(0);
                    done();
                    finalDone();
                });
        });
    });
}

function usersPost(finalDone) {
    describe("新建用户", function() {
        it("/users post", function(done) {
            swaggerHippie()
                .post("/users")
                .send({
                    name: "zhfang1001"+range(5),
                    email: "zhfang"+range(5)+"@datamans-in.com",
                    password: "Fzh12345"
                })
                .expectStatus(200)
                .expectValue('code', 0)
                .end(function (err, res, body) {
                    //console.log("zhfang1001"+range(5))
                    // console.log(res),
                    //if(err) throw err;
                    expect(body.code).to.equal(0);
                    done();
                    finalDone();
                });
        });
    });
}

function usersIdGet(finalDone) {
    describe("获取id为user_id的用户信息", function() {
        it("GET /users/{user_id}", function(done) {
            swaggerHippie()
                .get("/users/{user_id}")
                .pathParams({
                    user_id: 53
                })
                .expectStatus(200)
                .expectValue('code', 0)
                .end(function (err, res, body) {
                    //console.log(body)
                    expect(body.code).to.equal(0);
                    done();
                    finalDone();
                });
        });
    });
}

function usersPatch(finalDone) {
    describe("用户", function() {
        it("冻结或解冻用户", function(done) {
            swaggerHippie()
                .patch("/users/{user_id}")
                .pathParams({
                    user_id: 2
                })
                .send({
                    method: "enable"
                })
                .expectStatus(200)
                .expectValue('code', 0)
                .end(function (err, res, body) {
                    //console.log(body)
                    expect(body.code).to.equal(0);
                    done();
                    finalDone();
                });
        });
    });
}

function usersPut(finalDone) {
    describe("重置用户密码", function() {
        it("PUT /users/{user_id}", function(done) {
            swaggerHippie()
                .put("/users/{user_id}")
                .pathParams({
                    user_id: 2
                })
                .send({
                    password: "Fzh12345"
                })
                .expectStatus(200)
                .expectValue('code', 0)
                .end(function (err, res, body) {
                    console.log(body)
                    expect(body.code).to.equal(0);
                    done();
                    finalDone();
                });
        });
    });
}