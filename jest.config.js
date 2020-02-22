// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {


  
  moduleNameMapper: {
    "\\.(css|sass)$": "identity-obj-proxy",
  },

  transform: {
    "\\.(png)$": "<rootDir>/spec/javascript/fileTransformer.js",
    "\\.(jpg)$": "<rootDir>/spec/javascript/fileTransformer.js",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.js?$": "babel-jest"


  },

  clearMocks: true,

  coverageDirectory: "coverage",

  moduleFileExtensions: [
    "js",
    "json", 
    "jsx", 
    "ts", 
    "tsx", 
    "node",
    ".png"
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
