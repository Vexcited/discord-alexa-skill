const HeartbeatHandler = require('./HeartbeatHandler');

class MessageHandler {
    constructor(ws) {
        this.ws = ws;
        this.session_id = null;
        this.heartbeat = new HeartbeatHandler(this.ws);

        // Data in cache.
        this.private_channels = [];
        this.relationships = [];
        this.guilds = [];
        this.user = null;
        this.userStatus = null;
    }

    handle(message) {
        const data = JSON.parse(message);
        console.info(`[DiscordWS][MessageHandler] Received ${data.op}.`);

        switch (data.op) {
            case 0:
                this.handleDiscordEvent(data);
                break;
            // 10 Hello 
            case 10:
                this.handleHello(data);
                break;
            // 11 Heartbeat ACK
            case 11:
                this.handleHeartbeatAck(data);
                break;
        }
    }


    handleHello(data) {
        // Modify the default interval (0) to the heartbeat_interval given.
        this.heartbeat.modifyHeartbeatInterval(data.d.heartbeat_interval);
        if (data.s) this.heartbeat.modifyHeartbeatData(data.s);

        // Prepare next heatbeat.
        this.heartbeat.prepareHeartbeat();
    }

    handleHeartbeatAck(data) {
        if (data.s) this.heartbeat.modifyHeartbeatData(data.s);

        // Prepare next heatbeat.
        this.heartbeat.prepareHeartbeat();
    }

    handleDiscordEvent(data) {
        if (data.t === "READY") {
            const {
                // For resuming session.
                session_id,

                // To collect in cache
                user,
                user_settings,
                relationships,
                private_channels,
                guilds
            } = data.d;

            // Store the session_id.
            this.session_id = session_id;

            // Store data.
            this.private_channels = private_channels;
            this.relationships = relationships;
            this.user = user;
            this.guilds = guilds;
            this.userStatus = user_settings.status;
        }
    }
}

module.exports = MessageHandler;