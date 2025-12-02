const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "e2e/**/*.cy.js",
    baseUrl: "http://127.0.0.1:5500/webshop",
    setupNodeEvents(on, config) {
      on("task", {
        askForInput(message) {
          return new Promise((resolve) => {
            console.log("\n==============================");
            console.log(message);
            console.log("Írd be a választ, majd ENTER:");
            console.log("==============================\n");

            const stdin = process.openStdin();
            stdin.once("data", (data) => {
              resolve(data.toString().trim());
            });
          });
        },
      });
    },
  },
});
