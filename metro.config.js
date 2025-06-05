const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// Add support for additional file extensions if needed
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  "db",
)

module.exports = config
