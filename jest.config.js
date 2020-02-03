// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  moduleNameMapper: {
    "\\.(css|sass)$": "identity-obj-proxy",
  },

  clearMocks: true,

  coverageDirectory: "coverage",

  moduleFileExtensions: [
    "js",
    "json", 
    "jsx", 
    "ts", 
    "tsx", 
    "node"
  ],

  verbose: true,

  testMatch: [ "**/?(*_spec).[jt]s?(x)" ],
  
  modulePathIgnorePatterns: [
    "<rootDir>/config"
  ],

  modulePaths: [
    "<rootDir>/app/javascript/",
    "<rootDir>/spec/javascript"
  ],

  moduleDirectories: [
     "node_modules",
  ],

  reporters: ["default", "jest-junit"],

  setupFiles: ["<rootDir>/spec/javascript/test-utils.js"],
};
