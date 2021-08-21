const searchAlias = require("./searchAlias");
const fetch = require("node-fetch");
const aliases = require("../../aliases.json");

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

    /**
     * Send a message to specified user (or channel) alias with given content.
     */
    static async sendMessage(alias, type, content) {
        // TO-DO: Better fix for translation problem.
        if (type === "utilisateurs") type = "users";
        if (type === "salons") type = "channels";

        // Defining variables.
        let userId = "", channelId = "";

        // Foreach the aliases and found the one
        // that correspond to the given name.
        // (we also lower case the aliases for better results).
        for (const aliasName in aliases[type]) {
            // If aliases match.
            if (aliasName.toLowerCase() === alias) {
                if (type === "users") { // If user, save ID for getting the Channel ID.
                    userId = aliases[type][aliasName];
                }
                else if (type === "channels") { // If channel, save ID for sending the message.
                    channelId = aliases[type][aliasName];
                }
            }
        }

        // If we want to DM a user, we need to get
        // the channel ID from the user ID to send the message.
        if (type === "users") {
            // Open DM channel to get channelId.
            const channelPath = `${API_ENDPOINT}/users/@me/channels`;
            const channelResponse = await fetch(channelPath, {
                method: "POST", // Open the DM channel.
                body: JSON.stringify({
                    recipient_id: userId // User ID from alias.
                }),
                headers: {
                    "Authorization": process.env.DISCORD_TOKEN,
                    "Content-Type": "application/json"
                }
            });

            // Get the response data.
            // If successful, get the Channel ID.
            const channelData = await channelResponse.json();
            if (channelResponse.status === 200) {
                channelId = channelData.id;
            }
            else {
                throw new Error(
                    `Error while opening DM channel to user ${alias}\n`
                    + `Status: ${channelResponse.status}\n`
                    + `Errors: ${JSON.stringify(channelData, null, 4)}`
                );
            }
        }

        // Now we have the channel ID, we can send the message.
        const path = `${API_ENDPOINT}/channels/${channelId}/messages`;
        const options = {
            method: "POST",
            body: JSON.stringify({
                content
            }),
            headers: {
                "Authorization": process.env.DISCORD_TOKEN,
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(path, options);
        return response.status === 200;
    }
}

module.exports = DiscordWebClient;