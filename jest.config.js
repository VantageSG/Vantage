// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  clearMocks: true,

  coverageDirectory: "coverage",

  modulePathIgnorePatterns: [
    "<rootDir>/config/webpack/test.js"
  ],

  modulePaths: [
    "<rootDir>/app/javascript/",
    "<rootDir>/jest/"
  ],

  moduleDirectories: [
     "node_modules",
  ],

  setupFiles: ["<rootDir>/jest/test-utils.js"],
};
