const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "dptfv6",

  e2e: {
    specPattern: 'tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,

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
