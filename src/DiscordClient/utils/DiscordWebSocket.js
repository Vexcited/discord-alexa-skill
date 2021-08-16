const WebSocket = require("ws");
const MessageHandler = require("./MessageHandler");

class DiscordWebSocket extends WebSocket {
    constructor() {
        // Gateway Version = 9.
        // Gateway Encoding = json.
        super("wss://gateway.discord.gg/?v=9&encoding=json");

        // Set the message handler.
        // We pass the DiscordWebSocket instance to the message handler.
        this.messageHandler = new MessageHandler(this);

        // Open event where we identify to Discord.
        this.on("open", this.openHandler);

        // Message event handler.
        this.on("message", this.messageHandler.handle.bind(this.messageHandler));
    }

    // Identify to Discord.
    openHandler() {
        this.send(JSON.stringify({
            op: 2,
            d: {
                capabilities: 125,
                token: process.env.DISCORD_TOKEN,
                properties: {
                    "$os": "linux",
                    "$browser": "discord-skill",
                    "$device": "alexa"
                }
            }
        }));

        console.info("[DiscordWS] Opening WS...");
    }
}

module.exports = DiscordWebSocket;