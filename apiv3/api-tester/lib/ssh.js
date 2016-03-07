var SSH = require('simple-ssh');

//module.exports = function(done) {
module.exports =
    function ssh_install(sshConfig, cmd, callback) {
        var ssh = new SSH(sshConfig);

        ssh.exec(cmd, {
            out: function (stdout) {
                console.log(stdout);
            },
            exit: function() {
                callback && callback();
                console.log('   SSH install end.');
            }
        }).start({
            fail: function(err) {
                console.log(err);
                if (err) throw err;
            }
        });
    };

    //ssh_install("127.0.0.1", '22', 'dataman', 'inc', 'make', done);
//}
