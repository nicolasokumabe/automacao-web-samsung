const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 50000,
  viewportWidth: 430, // Definição da largura padrão da viewport
  viewportHeight: 932, // Definição da altura padrão da viewport
  // iPhone 14 Pro Max

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true
  },
});