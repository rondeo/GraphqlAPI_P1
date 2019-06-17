const express = require('express');
const {createServer} = require('http');
const dynroutes = require("./dynroutes");
const orientDB_server = require("./connectors/orientdb");
const PORT = 3000;

(async () => {

  const orientDb = await require("./seed")(orientDB_server);
  const app = express();
  app.dynroutes = dynroutes;
  
  await dynroutes(app, orientDb);
  // orientDb.server.close();

  const server = createServer(app);
  app.listen(PORT, () => {
     console.log(`server api available on port ${PORT}.`)
  });

})()


  