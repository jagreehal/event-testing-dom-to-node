module.exports = function() {
  return {
    workers: {
      initial: 1,
      regular: 1,
      recycle: true
    },
    files: [
      "!src/**/*.spec.js",
      "public/**/*.*",
      "src/**/*.js",
      {
        pattern: "package.json",
        load: false
      }
    ],
    tests: ["src/**/*.spec.js"],
    env: {
      type: "node"
    },
    testFramework: "jest",
    setup: function(w) {
      wallaby.testFramework.configure(require("./package.json").jest);
    }
  };
};
