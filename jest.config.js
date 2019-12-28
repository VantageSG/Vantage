// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

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

  reporters: ["default", "jest-junit"],

  setupFiles: ["<rootDir>/jest/test-utils.js"],
};
