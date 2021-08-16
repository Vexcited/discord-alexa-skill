const Alexa = require("ask-sdk-core");

class LaunchRequestHandler {
  constructor(discord) {
    this.discord = discord;
  }

  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  }

  handle(handlerInput) {
    console.info("[LaunchRequestHandler] Received.");

    const speechText = `Welcome ${this.discord.messageHandler.user.username} to the Discord unofficial API skill !`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(`Welcome ${this.discord.messageHandler.user.username} to Discord unofficial API skill. Ask me your latest messages !`, speechText)
      .getResponse();
  }
}
module.exports = LaunchRequestHandler;