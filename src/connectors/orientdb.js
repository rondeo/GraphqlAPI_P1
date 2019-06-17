const OrientDB = require('orientjs');

const server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'root'
});

module.exports = server;