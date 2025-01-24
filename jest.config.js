export default {
    testEnvironment: "jsdom", // Use jsdom to simulate the browser environment
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest", // Use babel-jest to transpile JSX and ES6+ code
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup file for Jest
  };
  