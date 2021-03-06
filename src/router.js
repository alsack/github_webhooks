const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

var childProcess = require('child_process');
var githubUsername = 'alsack'

var router = express.Router();

//prase JSON
router.use(bodyParser.json());

//handle posts from the github webhooks
router.post('/', (req, res) => {
    let repo = req.body.repository.name;
    var sender = req.body.sender;
    var branch = req.body.ref;

    console.log('received request to update ' + repo + ' on branch ' +
            branch + ' from ' + sender);

    if(branch.indexOf('master') > -1 && sender.login === githubUsername){
        if(fs.existsSync(path.resolve(__dirname, '../../' + repo))) {
            //wait 10 seconds, then pull, restart the server.
            setTimeout(() => { deploy(repo); }, 10000);
            res.send(201);
        } else {
            res.send(500);
        }
    }
    res.send(202);
});

function deploy(repo){
    var scriptDir = path.resolve(__dirname, '..');
    console.log('github webooks updating ' + repo + ' from ' + scriptDir);
    childProcess.exec('cd ' + scriptDir + ' && ./rebuild_deploy_script.sh ' + repo + ' > deploy.log 2>&1', function(err, stdout, stderr){
        if (err) {
         console.error(err);
        }
      });
}

module.exports = router;