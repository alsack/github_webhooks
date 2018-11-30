const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var childProcess = require('child_process');
var githubUsername = 'alsack'

var router = express.Router();

//prase JSON
router.use(bodyParser.json());

//handle posts from the github webhooks
router.post('/', (req, res) => {
    var repo = req.body.repository.name;
    var sender = req.body.sender;
    var branch = req.body.ref;

    if(branch.indexOf('master') > -1 && sender.login === githubUsername){
        deploy(repo, res);
    }
});

function deploy(repo, res){
    var scriptDir = path.resolve(__dirname, '..');
    childProcess.exec('cd ' + scriptDir + ' && ./rebuild_deploy_script.sh ' + repo, function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return res.send(500);
        }
        res.send(200);
      });
}

module.exports = router;