// server.js
const app = require("./app");
const migrate = require("./migrate"); // Import the migrate function

// Run migrations, then start the server
migrate()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to run migrations:", error.message);
  });
