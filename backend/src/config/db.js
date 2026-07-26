"use strict";

const app = require("./app");
const config = require("./config/env");
const { connect } = require("./config/db");

async function start() {
  try {
    await connect();

    app.listen(config.port, () => {
      console.log(
        `🚀 Blood Steal SMP API running on http://localhost:${config.port}`
      );
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();