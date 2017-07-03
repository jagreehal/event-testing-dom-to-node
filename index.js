const api = require("./api/app")();
const portfinder = require("portfinder");

function runServer(port, cb) {
  process.env.API_SERVER = `http://localhost:${port}`;
  const server = require("./server/app");
  server.listen(9998, cb);
}

function handleError(err) {
  console.error(err);
  process.exit(1);
}

portfinder.getPort(function(err, apiPort) {
  if (err) {
    return handleError(err);
  }
  api.listen(apiPort, err => {
    if (err) {
      return handleError(err);
    }
    portfinder.getPort(function(err, serverPort) {
      if (err) {
        return handleError(err);
      }
      runServer(apiPort, err => {
        if (err) {
          handleError(err);
        }
        console.log("running server");
      });
    });
  });
});
