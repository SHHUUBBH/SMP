"use strict";

const app = require("./app");
const config = require("./config/env");
const { connect } = require("./config/db");

async function start() {
  try {
    // Connect to MongoDB
    await connect();

    // Start HTTP server
    app.listen(config.port, () => {
      console.log("");
      console.log("═══════════════════════════════════════");
      console.log("🚀 Blood Steal SMP API");
      console.log("═══════════════════════════════════════");
      console.log(`🌐 URL         : http://localhost:${config.port}`);
      console.log(`📦 Environment : ${config.nodeEnv}`);
      console.log(`🗄️  Database   : Connected`);
      console.log("═══════════════════════════════════════");
      console.log("");
    });
  } catch (err) {
    console.error("");
    console.error("❌ Failed to start server");
    console.error(err);
    console.error("");
    process.exit(1);
  }
}

process.on("SIGINT", () => {
  console.log("\n🛑 Server shutting down...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Server shutting down...");
  process.exit(0);
});

start();