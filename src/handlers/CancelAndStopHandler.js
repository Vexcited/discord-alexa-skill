const CancelAndStopHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent"
                || Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent");
    },
    handle(handlerInput) {
        const speechText = "See you next time !";

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("See you next time !", speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
};

module.exports = CancelAndStopHandler;