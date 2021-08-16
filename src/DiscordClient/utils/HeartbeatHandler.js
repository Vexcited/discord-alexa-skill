/**
 * Create the heartbeat interval handler.
 * 
 * @param {WebSocket} ws - WebSocket instance.
 * @param {Number} interval - Interval in milliseconds.
 */
class HeartbeatHandler {
    constructor(ws) {
        this.ws = ws;
        this.interval = 0;
        this.data = null;
    }

    modifyHeartbeatInterval(interval) {
        console.info(`[DiscordWS] => Modified HeartbeatInterval from ${this.interval} to ${interval}.`);

        this.interval = interval;
    }

    modifyHeartbeatData(data) {
        console.info(`[DiscordWS] => Modified HeartbeatData from ${this.data} to ${data}.`);

        this.data = data;
    }

    prepareHeartbeat() {
        setTimeout(
            this.sendHeartbeat.bind(this),
            this.interval
        );

        console.info(`[DiscordWS] + Prepared next heartbeat, in ${this.interval / 1000}s`);
    }

    sendHeartbeat() {
        this.ws.send(
            JSON.stringify({
                op: 1,
                d: this.data
            })
        );

        console.info("[DiscordWS] ++ Heartbeat sent !");
    }
}

module.exports = HeartbeatHandler;