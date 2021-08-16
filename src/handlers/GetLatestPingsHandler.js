const Alexa = require("ask-sdk-core");
const DiscordWebClient = require("../DiscordWebClient");
const aliases = require("../../aliases.json");

const GetLatestPingsHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "GetLatestPings";
    },

    async handle(handlerInput) {
        console.info("[GetLatestPingsHandler] + Received.");
        const dateStringOptions = {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        }

        let speechText = "Your 5 latest mentions was";
        let simpleCardText = "";

        const mentions = await DiscordWebClient.getMentions();
        mentions.forEach((mention, key) => {
            const stringDate = mention.timestamp.toLocaleDateString("en-US", dateStringOptions);

            // foreach aliases in the aliases.json file.
            // Replace author name with alias if matches in the aliases file.
            for (const [alias, userId] of Object.entries(aliases)) {
                if (mention.authorId === userId) {
                    mention.author = alias;
                }
            }

            // Escape HTML special characters.
            mention.content = mention.content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

            speechText += `the ${stringDate} by ${mention.author}. The message content is ${mention.content}.${key !== 4 && " The next mention was "}`;
            simpleCardText += `Mentionned by ${mention.author}: ${mention.content}. `;
        })

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(simpleCardText, speechText)
            .getResponse();
    }
};

module.exports = GetLatestPingsHandler;