const fetch = require("node-fetch");
const API_ENDPOINT = "https://discord.com/api/v9";

class DiscordWebClient {
    static async getMentions() {
        const path = `${API_ENDPOINT}/users/@me/mentions?limit=5&roles=true&everyone=true`;
        const options = {
            headers: {
                "Authorization": process.env.DISCORD_TOKEN
            }
        }

        const response = await fetch(path, options);
        const data = await response.json();

        const mentions = [];
        data.forEach(mention => {
            mentions.push({
                author: mention.author.username,
                authorId: mention.author.id,
                content: mention.content,
                // type: mention.type,
                timestamp: new Date(mention.timestamp)
            });
        });

        return mentions;
    }
}

module.exports = DiscordWebClient;