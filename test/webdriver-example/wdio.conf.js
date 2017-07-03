exports.config = {
  specs: ["./tests/**/*.js"],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome"
    }
  ],
  sync: true,
  logLevel: "error",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd"
  }
};
