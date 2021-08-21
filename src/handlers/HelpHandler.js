const Alexa = require("ask-sdk-core");

const HelpHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent";
    },

    handle(handlerInput) {
        // Get Alexa locale language.
        const languageForSpeech = Alexa.getLocale(handlerInput.requestEnvelope).split("-")[0];
        const speechLanguage = require(`../languages/${languageForSpeech}.json`)["HelpHandler"];

        return handlerInput.responseBuilder
            .speak(speechLanguage.speechText)
            .reprompt(speechLanguage.speechText)
            .withSimpleCard(speechLanguage.simpleCardTitle, speechLanguage.speechText)
            .getResponse();
    }
};

module.exports = HelpHandler;