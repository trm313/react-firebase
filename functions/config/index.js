const functions = require("firebase-functions");
const production = require("./production");
const development = require("./development");

// Load environment variables from Firebase
// Set environment variables using scripts in functions/package.json
// Local environment variables are set in .runtimeconfig.json (see .runtimeconfig.json.example for structure)
let env = functions.config();
// TODO: Drop all this - just export functions.get() directly, call it more normally around
const config = {
  CLIENT_URL: "--app.client_url--",
  API_URL: "--app.api_url--",
  DATABASE_NAME: "DatabaseName",
};

if (env !== "PRODUCTION") {
  module.exports = Object.assign({}, config, development);
} else {
  module.exports = Object.assign({}, config, production);
}
