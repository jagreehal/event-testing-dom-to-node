var Nightmare = require("nightmare");
var nightmare = Nightmare({ show: false });
const http = require("http");
const rp = require("request-promise");
var jsdom = require("jsdom/lib/old-api.js");
const virtualConsole = jsdom.createVirtualConsole().sendTo(console);
var Canvas = require("canvas");

const api = require("./api");

function handleError(err) {
  console.error(err);
  process.exit(1);
}

function runServer(port, cb) {
  process.env.API_SERVER = `http://localhost:${port}`;
  const server = require("./server");
  let instance = server.listen(9998, err => {
    cb(err, instance);
  });
}

describe("Can ping api two levels away!", () => {
  let apiInstance;
  let serverInstance;
  beforeEach(done => {
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

  afterEach(done => {
    apiInstance.close(err => {
      serverInstance.close(done);
    });
  });

  async function windowLoaded(window) {
    return new Promise(resolve => {
      window.addEventListener("load", resolve);
    });
  }

  it("will all one into array", async () => {
    jsdom.defaultDocumentFeatures = {
      FetchExternalResources: ["script", "img"],
      ProcessExternalResources: ["script", "img"],
      MutationEvents: "2.0",
      QuerySelector: false
    };

    var htmlDoc = `
      '<html>
        <body>      
        <script src='http://localhost:9998/foo.js'></script>
        </body>      
      </html>`;

    var document = jsdom.jsdom(htmlDoc, { virtualConsole });
    var window = document.defaultView;

    await windowLoaded(window);

    await new Promise(resolve => setTimeout(resolve, 1000));

    let response = await rp("http://localhost:9999");
    let result = JSON.parse(response);
    expect(result.length).toEqual(1);
  });
});
