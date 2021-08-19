const Alexa = require("ask-sdk-core");

const HelpHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent";
    },
    handle(handlerInput) {
        const speechText = "You can ask me your last mention and mark it as read, or send a message to something defined in the aliases file !";
        const simpleCardTitle = "Help";

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(simpleCardTitle, speechText)
            .getResponse();
    }
};

module.exports = HelpHandler;