const Nightmare = require("nightmare");
const rp = require("request-promise");
const _ = require("lodash");
const portfinder = require("portfinder");

function handleError(err) {
  console.error(err);
  process.exit(1);
}

function runServer(apiPort, cb) {
  portfinder.getPort(function(err, serverPort) {
    if (err) {
      return cb(err);
    }
    process.env.API_SERVER = `http://localhost:${apiPort}`;
    const server = require("../src/server");
    let instance = server.listen(serverPort, err => {
      return cb(err, instance);
    });
  });
}

function runApi(store, cb) {
  portfinder.getPort(function(err, apiPort) {
    if (err) {
      return cb(err);
    }
    const api = require("../src/api")(store);
    let instance = api.listen(apiPort, err => {
      return cb(err, instance);
    });
  });
}

describe("Using Nightmare.js", () => {
  let apiInstance;
  let apiPort;
  let nightmare;
  let serverInstance;
  let serverPort;
  let store = [];
  beforeAll(done => {
    runApi(store, (err, instance) => {
      if (err) {
        return handleError(err);
      }
      apiInstance = instance;
      apiPort = apiInstance.address().port;
      runServer(apiPort, (err, instance) => {
        if (err) {
          return handleError(err);
        }
        serverInstance = instance;
        serverPort = serverInstance.address().port;
        done();
      });
    });
  });
  beforeEach(() => {
    nightmare = Nightmare({ show: false });
  });

  afterAll(done => {
    apiInstance.close(err => {
      serverInstance.close(done);
    });
  });

  it("check using store", async () => {
    let timestamp = new Date().getTime().toString();
    let url = `http://localhost:${serverPort}/record`;
    let html = `
      <html>
        <body>
        <script>
        window.payload = {
            name: 'x',
            url: '${url}',
            timestamp: '${timestamp}'
        };
        </script>
        <script src='http://localhost:${serverPort}/client.js'></script>
        </body>
      </html>`;

    let window = await nightmare.goto(`data:text/html,${html}`).end();

    let result = _.find(store, { timestamp });

    expect(result.timestamp).toEqual(timestamp);
  });

  it("check using request", async () => {
    let timestamp = new Date().getTime().toString();
    let url = `http://localhost:${serverPort}/record`;
    let html = `
      <html>
        <body>
        <script>
        window.payload = {
            name: 'x',
            url: '${url}',
            timestamp: '${timestamp}'
        };
        </script>
        <script src='http://localhost:${serverPort}/client.js'></script>
        </body>
      </html>`;

    let window = await nightmare
      .on("console", (log, msg) => {
        console.log(msg);
      })
      .goto(`data:text/html,${html}`)
      .end();

    let response = await rp(`http://localhost:${apiPort}/${timestamp}`);

    let result = JSON.parse(response);
    expect(result.timestamp).toEqual(timestamp);
  });
});
