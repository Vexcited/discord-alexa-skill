const Alexa = require("ask-sdk-core");
const Discord = require("../utils/Discord");

const CreateMessageHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "CreateMessageIntent";
    },

    async handle(handlerInput) {
        console.info("[IntentHandler][CreateMessage] -> Received from Alexa.");

        // Define final speech.
        let speechText = "", simpleCardText = "", simpleCardTitle = "";

        // Get Alexa locale language.
        const languageForSpeech = Alexa.getLocale(handlerInput.requestEnvelope).split("-")[0];
        const speechLanguage = require(`../languages/${languageForSpeech}.json`)["CreateMessageIntent"];

        // In the type, the user would say user or channel.
        // In the aliases.json, we have a trailing "s" for plural.
        // So we hard code the plural here.
        const type = Alexa.getSlotValue(handlerInput.requestEnvelope, "type") + "s";
        const alias = Alexa.getSlotValue(handlerInput.requestEnvelope, "name").toLowerCase();
        const content = Alexa.getSlotValue(handlerInput.requestEnvelope, "content");

        if (type && alias && content) {
            const resStatus = await Discord.sendMessage(alias, type, content);

            // If the message was sent successfully, then tell the user.
            if (resStatus) {
                speechText = speechLanguage.success.speechText.replace("{messageDestination}", alias);
                simpleCardText = speechLanguage.success.simpleCardText.replace("{messageDestination}", alias);
                simpleCardTitle = speechLanguage.success.simpleCardTitle;

                console.info(`[IntentHandler][CreateMessage] <- Sent message to ${alias} with content ${content}`);
            }
            // Tell user an error occurred.
            else {
                speechText = speechLanguage.error.speechText.replace("{messageDestination}", alias);
                simpleCardTitle = speechLanguage.error.simpleCardTitle;
            }
        }
        else {
            throw new Error("CreateMessageIntent: Type, alias or content was null.");
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(simpleCardTitle, simpleCardText)
            .getResponse();
    }
};

module.exports = CreateMessageHandler;