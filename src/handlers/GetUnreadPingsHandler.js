const Alexa = require("ask-sdk-core");

const GetEveryUnreadPingHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetEveryUnreadPing';
    },
    handle(handlerInput) {
        console.info("[GetEveryUnreadPingHandler] Received.")

        const speechText = "GetEveryUnreadPing !";

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("GetEveryUnreadPing", speechText)
            .getResponse();
    }
};

module.exports = GetEveryUnreadPingHandler;