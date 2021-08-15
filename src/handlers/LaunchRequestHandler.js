const Alexa = require("ask-sdk-core");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  },
  handle(handlerInput) {
    console.info("[LaunchRequestHandler] Received.")

    const speechText = "Welcome to the Discord unofficial API skill !";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Welcome to Discord unofficial API skill. Ask me your latest messages !", speechText)
      .getResponse();
  }
};

module.exports = LaunchRequestHandler;