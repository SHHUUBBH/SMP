"use strict";

const mongoose = require("mongoose");
const config = require("./env");

mongoose.set("strictQuery", true);

let memoryServer = null;
let connecting = null;

function isConnected() {
  return mongoose.connection.readyState === 1;
}

async function startMemoryServer() {
  let MongoMemoryServer;
  try {
    ({ MongoMemoryServer } = require("mongodb-memory-server"));
  } catch (err) {
    throw new Error(
      "[db] USE_MEMORY_DB=true but 'mongodb-memory-server' is not installed. " +
        "Run `npm i -D mongodb-memory-server` inside backend/, or set USE_MEMORY_DB=false and " +
        "point MONGODB_URI at a real MongoDB instance."
    );
  }
  try {
    memoryServer = await MongoMemoryServer.create({ instance: { dbName: "alone_hometown" } });
  } catch (err) {
    throw new Error(
      `[db] Failed to start the in-memory MongoDB: ${err.message}\n` +
        "The first run downloads a mongod binary and needs internet access. If you are offline, set " +
        "USE_MEMORY_DB=false in backend/.env and point MONGODB_URI at a reachable MongoDB instance."
    );
  }
  return memoryServer.getUri();
}

async function connect() {
  if (isConnected()) return;
  if (connecting) return connecting;

  connecting = (async () => {
    let uri = config.mongoUri;
    if (config.useMemoryDb) {
      uri = await startMemoryServer();
      if (!config.isTest) {
        console.warn(
          "[db] Using an in-memory MongoDB (USE_MEMORY_DB=true) - data resets on every restart. " +
            "Set USE_MEMORY_DB=false and MONGODB_URI=<your mongodb url> to persist data."
        );
      }
    }

    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: config.useMemoryDb ? 30000 : 10000,
        maxPoolSize: 10,
      });
    } catch (err) {
      throw new Error(
        `[db] Could not connect to MongoDB at ${redact(uri)}: ${err.message}\n` +
          "Fixes: (1) start a local mongod, (2) set MONGODB_URI in backend/.env to a MongoDB Atlas " +
          "connection string, or (3) set USE_MEMORY_DB=true to run with a throwaway in-process database."
      );
    }

    if (!config.isTest) {
      console.log(`[db] connected -> ${redact(uri)}`);
    }
  })();

  try {
    await connecting;
  } finally {
    connecting = null;
  }
}

async function disconnect() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}

function redact(uri) {
  return String(uri).replace(/\/\/([^:@/]+):([^@/]+)@/, "//$1:****@");
}

module.exports = { connect, disconnect, isConnected };
