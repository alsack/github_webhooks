const router = require('router.js');

// launch server
const nodeWebServer = require('node_web_server/src/index.js');

// add routes
nodeWebServer.app.use('/', router);

module.exports = {nodeWebServer};