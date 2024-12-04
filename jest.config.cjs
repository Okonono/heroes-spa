module.exports = {
    testEnvironment: "jest-environment-jsdom", // Entorno para pruebas con React
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest", // Usa Babel para transformar JS y JSX
    },
    transformIgnorePatterns: [
      "node_modules/(?!(query-string)/)", // Transforma específicamente query-string si es ESM
    ],
  };