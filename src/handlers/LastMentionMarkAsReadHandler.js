const Alexa = require("ask-sdk-core");
const DiscordWebClient = require("../DiscordWebClient");

const LastMentionMarkAsReadHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "LastMentionMarkAsReadIntent";
    },

    async handle(handlerInput) {
        console.info("[IntentHandler][LastMentionMarkAsRead] -> Received from Alexa.");

        // Define final speech.
        let speechText = "", simpleCardText = "", simpleCardTitle = "";

        try {
            const lastMention = await DiscordWebClient.getLastMention();
            const { success } = await DiscordWebClient.clearLastMention(lastMention.id);

            if (success) {
                speechText = `Your last mention by ${lastMention.author} have been marked as read !`;
                simpleCardTitle = `Your last mention by ${lastMention.author}.`;
                simpleCardText = `Mention by ${lastMention.author} marked as read.`;

                console.info(`[IntentHandler][LastMentionMarkAsRead] <- Marked as read a mention by ${lastMention.author}.`);
            }
            else {
                throw new Error("UnsuccessOnRequest");
            }
        }
        catch (error) {
            speechText = "Sorry, I couldn't mark your last mention as read.";
            simpleCardTitle = "An error occured.";
            simpleCardText = "Sorry, I couldn't mark your last mention as read.";

            console.info(`[IntentHandler][LastMentionMarkAsRead] <- Handled an error.`, error);
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(simpleCardTitle, simpleCardText)
            .getResponse();
    }
};

module.exports = LastMentionMarkAsReadHandler;