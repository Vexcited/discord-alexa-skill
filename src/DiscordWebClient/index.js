const searchAlias = require("../utils/searchAlias");
const fetch = require("node-fetch");

const API_ENDPOINT = "https://discord.com/api/v9";
const DEFAULT_OPTIONS = {
    headers: {
        "Authorization": process.env.DISCORD_TOKEN
    }
};

class DiscordWebClient {

    /**
     * Returns last mention.
     */
    static async getLastMention() {
        const path = `${API_ENDPOINT}/users/@me/mentions?limit=1&roles=true&everyone=true`;

        // Get API response.
        const response = await fetch(path, DEFAULT_OPTIONS);
        const data = await response.json();

        // Get the mention data.
        const mention = data[0];

        // Get the mention type.
        // For the reply, I can't retrieve the message datas from its ID.
        // => Discord API doesn't authorize to use the route for message fetching.
        // => TO-DO: Use Discord WS API to retrieve the message datas.
        let mentionType = "message"; // Message is type 0.
        if (mention.type === 19) mentionType = "replied";

        // Search if the mention author have an alias.
        const aliasSearchResults = searchAlias(mention.author.id, "users");

        // Get mention author or alias if exists.
        const author = (aliasSearchResults.success) ?
            aliasSearchResults.alias :
            mention.author.username;

        return {
            author,
            id: mention.id,
            type: mentionType,
            content: mention.content,
            mentions: mention.mentions,
            timestamp: new Date(mention.timestamp)
        };
    }

    /**
     * Mark as read the last mention
     */
    static async clearLastMention(id) {
        const path = `${API_ENDPOINT}/users/@me/mentions/${id}`;
        const options = {
            method: "DELETE",
            ...DEFAULT_OPTIONS
        }

        const response = await fetch(path, options);

        return {
            success: response.status === 204
        }
    }

    /**
     * Returns data of the current logged user.
     */
    static async getCurrentLoggedUser() {
        const path = `${API_ENDPOINT}/users/@me`;
        const res = await fetch(path, DEFAULT_OPTIONS);
        const data = await res.json();

        return data;
    }
}

module.exports = DiscordWebClient;