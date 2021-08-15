const WebSocket = require("ws");
require("dotenv").config();

// Connect to the Discord WebSocket.
const ws = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");

// When the socket is opened.
ws.on("open", open = () => {

    // Login to Discord.
    ws.send(JSON.stringify({
        op: 2,
        d: {
            token: process.env.DISCORD_TOKEN,
            properties: {
                "$os": "linux",
                "$browser": "discord-skill",
                "$device": "alexa"
            }
        }
    }));
});

ws.on('message', incoming = (message) => {
    console.log('received: %s', message);
});