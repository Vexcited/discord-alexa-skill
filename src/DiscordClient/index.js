const DiscordWebSocket = require("./utils/DiscordWebSocket");
const DiscordClient = new DiscordWebSocket();

// Exports the DiscordClient class
// so we can access it from outside.
module.exports = DiscordClient;