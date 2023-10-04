const app = require("./app");
const migrate = require("../scripts/migrate");

migrate()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to run migrations:", error.message);
  });
