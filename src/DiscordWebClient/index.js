const searchAlias = require("../utils/searchAlias");
const fetch = require("node-fetch");

const API_ENDPOINT = "https://discord.com/api/v9";
const DEFAULT_OPTIONS = {
    headers: {
        "Authorization": process.env.DISCORD_TOKEN
    }
};

class DiscordWebClient {
    static async getMessageFromId(channelId, messageId) {
        const path = `${API_ENDPOINT}/channels/${channelId}/messages/${messageId}`;
        const res = await fetch(path, DEFAULT_OPTIONS);
        const data = await res.json();

        return data;
    }

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
        let mentionType = "message"; // Message is type 0.
        if (mention.type === 19) mentionType = "replied";

        // If message type is replied, get the replied message.
        let repliedMessage = null;
        if (mentionType === "replied") {
            const repliedMessageId = mention.message_reference.message_id;
            const repliedChannelId = mention.message_reference.channel_id;
            repliedMessage = await this.getMessageFromId(repliedChannelId, repliedMessageId);
        }

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
            message_reference: repliedMessage,
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