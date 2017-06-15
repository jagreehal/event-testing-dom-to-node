// const http = require("http");
// const rp = require("request-promise");
// const jsdom = require("jsdom/lib/old-api.js");
// const virtualConsole = jsdom.createVirtualConsole().sendTo(console);
// const Canvas = require("canvas");

// const api = require("./api");

// function handleError(err) {
//   console.error(err);
//   process.exit(1);
// }

// function runServer(apiPort, cb) {
//   process.env.API_SERVER = `http://localhost:${apiPort}`;
//   const server = require("./server");
//   let instance = server.listen(9998, err => {
//     cb(err, instance);
//   });
// }

// describe("Can ping api two levels away!", () => {
//   let apiInstance;
//   let serverInstance;
//   beforeEach(done => {
//     apiInstance = api.listen(9999, err => {
//       if (err) {
//         return handleError(err);
//       }
//       runServer(9999, (err, instance) => {
//         if (err) {
//           return handleError(err);
//         }
//         serverInstance = instance;
//         done();
//       });
//     });
//   });

//   afterEach(done => {
//     apiInstance.close(err => {
//       serverInstance.close(done);
//     });
//   });

//   async function windowLoaded(window) {
//     return new Promise(resolve => {
//       window.addEventListener("load", resolve);
//     });
//   }

//   it("will all one into array", async () => {
//     // arrange
//     jsdom.defaultDocumentFeatures = {
//       FetchExternalResources: ["script", "img"],
//       ProcessExternalResources: ["script", "img"],
//       MutationEvents: "2.0",
//       QuerySelector: false
//     };

//     let timeStamp = new Date();
//     let payLoad = {
//       timeStamp,
//       client: "Acme"
//     };

//     var htmlDoc = `
//       <html>
//         <body>
//         <script>
//           let payload = ${payload};
//         </script>
//         <script src='http://localhost:9998/foo.js'></script>
//         </body>
//       </html>`;

//     // act
//     var document = jsdom.jsdom(htmlDoc, { virtualConsole });
//     var window = document.defaultView;

//     await windowLoaded(window);

//     await new Promise(resolve => setTimeout(resolve, 1000));

//     // assert
//     let response = await rp(`http://localhost:9999?timeStamp=${timeStamp}`);
//     let result = JSON.parse(response);
//     expect(result.length).toEqual(1);
//     expect(result.client).toBe(payload.client);
//   });
// });
