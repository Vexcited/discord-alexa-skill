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

        // Get Alexa locale language.
        const languageForSpeech = Alexa.getLocale(handlerInput.requestEnvelope).split("-")[0];
        const speechLanguage = require(`../languages/${languageForSpeech}.json`)["LastMentionMarkAsReadIntent"];

        try {
            const lastMention = await DiscordWebClient.getLastMention();
            const { success } = await DiscordWebClient.clearLastMention(lastMention.id);

            if (success) {
                speechText = speechLanguage.success.speechText.replace("{mentionAuthor}", lastMention.author);
                simpleCardText = speechLanguage.success.simpleCardText.replace("{mentionAuthor}", lastMention.author);
                simpleCardTitle = speechLanguage.success.simpleCardTitle;

                console.info(`[IntentHandler][LastMentionMarkAsRead] <- Marked as read a mention by ${lastMention.author}.`);
            }
            else {
                throw new Error("UnsuccessOnRequest");
            }
        }
        catch (error) {
            speechText = speechLanguage.error.speechText;
            simpleCardTitle = speechLanguage.error.simpleCardTitle;
            simpleCardText = speechLanguage.error.speechText;

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