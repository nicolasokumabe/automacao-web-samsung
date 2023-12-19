const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 50000,
  viewportWidth: 1440, // Definição da largura padrão da viewport
  viewportHeight: 900, // Definição da altura padrão da viewport

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
