const Alexa = require("ask-sdk-core");

const CancelAndStopHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent"
                || Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent");
    },
    handle(handlerInput) {
        console.info("[IntentHandler][Cancel/Stop] -> Received.");

        const languageForSpeech = alexaLocale.split("-")[0];
        const { speechText, simpleCardTitle } = require(`../languages/${languageForSpeech}.json`)["CancelAndStopHandler"];

        console.info("[IntentHandler][Cancel/Stop] <- Sent goodbye message.");
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(simpleCardTitle, speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
};

module.exports = CancelAndStopHandler;