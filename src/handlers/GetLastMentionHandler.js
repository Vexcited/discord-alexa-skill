const DiscordWebClient = require("../DiscordWebClient");
const Alexa = require("ask-sdk-core");
const fixSSMLContent = require("../utils/fixSSMLContent");
const searchAlias = require("../utils/searchAlias");

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "GetLastMentionIntent";
    },

    async handle(handlerInput) {
        /* Debug */ console.info("[IntentHandler][GetLastMention] -> Received.");
        const lastMention = await DiscordWebClient.getLastMention();
        let mentionContent = lastMention.content;

        // Replace mentions IDs with names.
        lastMention.mentions.map(mention => {
            // Check if mention is a user.
            if (mention.username) {
                // Check if user has an alias.
                const isMatchingAlias = searchAlias(mention.id, "users");

                // Replace ID by username, or Alias if exists.
                const mentionUsername = isMatchingAlias.success ? isMatchingAlias : mention.username;
                mentionContent = mentionContent.replace(new RegExp(`<@!?${mention.id}>`, "g"), mentionUsername);
            }
        });

        // Some emotes are not supported by the language detection library.
        // And they are not supported by Alexa (she can't say "xD" or "<3").
        // So we replace them by some text explaining them.
        mentionContent = fixSSMLContent(mentionContent);

        // Change start of speech depending on the type of mention.
        // Defaults if type = "message".
        let additionalTextIfReplied = "";
        console.log(lastMention.message_reference);
        if (lastMention.type === "replied")
            additionalTextIfReplied = `a reply to a message`;

        // Get current locale date in string format.
        const alexaLocale = Alexa.getLocale(handlerInput.requestEnvelope);
        const stringDate = lastMention.timestamp.toLocaleDateString(alexaLocale, {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        });

        // Build the speech.
        const speechText = `Your last mention was ${additionalTextIfReplied} the ${stringDate} by ${lastMention.author}. The message content is "${mentionContent}". Say "mark last mention as read" to mark it as read.`;
        const simpleCardTitle = `Your last mention by ${lastMention.author}.`;
        const simpleCardText = `${stringDate} - ${lastMention.author}: ${mentionContent}`;

        // Build the response.
        /* Debug */ console.info(`[IntentHandler][GetLastMention] <- Sent a mention by ${lastMention.author}.`);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(simpleCardTitle, simpleCardText)
            .getResponse();
    }
};