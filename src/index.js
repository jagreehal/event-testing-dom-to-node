const api = require("./api");

function runServer(port, cb) {
  process.env.API_SERVER = `http://localhost:${port}`;
  const server = require("./server");
  server.listen(9998, cb);
}

function handleError(err) {
  console.error(err);
  process.exit(1);
}

api.listen(9999, err => {
  if (err) {
    handleError(err);
  }
  runServer(9999, err => {
    if (err) {
      handleError(err);
    }
    console.log("running server");
  });
});
