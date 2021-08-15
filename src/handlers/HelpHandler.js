const Alexa = require("ask-sdk-core");

const HelpHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent";
    },
    handle(handlerInput) {
        const speechText = "You can ask me your latest pings !";

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard("You can ask me your latest pings !", speechText)
            .getResponse();
    }
};

module.exports = HelpHandler;