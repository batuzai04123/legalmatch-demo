const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  scrollBehavior: "nearest",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
