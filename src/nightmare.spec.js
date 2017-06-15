const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: false });
const rp = require("request-promise");

const api = require("./api");

function handleError(err) {
  console.error(err);
  process.exit(1);
}

function runServer(apiPort, cb) {
  process.env.API_SERVER = `http://localhost:${apiPort}`;
  const server = require("./server");
  let instance = server.listen(9998, err => {
    cb(err, instance);
  });
}

describe("Using Nightmare.js", () => {
  let apiInstance;
  let serverInstance;
  beforeAll(done => {
    apiInstance = api.listen(9999, err => {
      if (err) {
        return handleError(err);
      }
      runServer(9999, (err, instance) => {
        if (err) {
          return handleError(err);
        }
        serverInstance = instance;
        done();
      });
    });
  });

  afterAll(done => {
    apiInstance.close(err => {
      serverInstance.close(done);
    });
  });

  //   it("using page", async () => {
  //     let window = await nightmare
  //       .on("console", console.log)
  //       .goto("http://localhost:9998/init.html")
  //       .evaluate(function() {
  //         return window;
  //       })
  //       .end();

  //     let response = await rp(`http://localhost:9999`);

  //     let result = JSON.parse(response);
  //     expect(result.length).toEqual(1);
  //   });

  it("uses string", async () => {
    let timestamp = new Date().getTime().toString();
    let html = `
      <html>
        <body>
        <script>
        window.payload = {
            name: 'x',
            timestamp: ${timestamp}
        };
        </script>
        <script src='http://localhost:9998/client.js'></script>
        </body>
      </html>`;

    let window = await nightmare
      .goto(`data:text/html,${html}`)
      .on("console", console.log)
      .evaluate(function() {
        return window;
      })
      .end();

    let response = await rp(`http://localhost:9999/${timestamp}`);

    let result = JSON.parse(response);
    expect(result.timestamp).toEqual(timestamp);
  });
});
