const Alexa = require("ask-sdk-core");

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "SessionEndedRequest";
    },

    handle(handlerInput) {
        console.info("[SessionEnded] <- Done !");

        return handlerInput.responseBuilder.getResponse();
    }
};

module.exports = SessionEndedRequestHandler;