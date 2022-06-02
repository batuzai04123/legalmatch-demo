const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "i1tife",
  chromeWebSecurity: false,
  scrollBehavior: "nearest",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
