const Alexa = require("ask-sdk-core");

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "SessionEndedRequest";
    },
    handle(handlerInput) {
        // Any clean-up logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

module.exports = SessionEndedRequestHandler;