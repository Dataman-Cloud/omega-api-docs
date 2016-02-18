var SSH = require('simple-ssh');

module.exports = function(done) {
    function ssh_install(host, port, user, pass, cmd, callback) {
        var ssh = new SSH({
            host: host,
            port: port,
            user: user,
            pass: pass
        });

        ssh.exec(cmd, {
            out: function (stdout) {
                console.log(stdout);
            }
        }).on("exit", function () {
            callback && callback();
        }).start();
    }

    ssh_install("127.0.0.1", '22', 'dataman', 'inc', 'make', done);
}
