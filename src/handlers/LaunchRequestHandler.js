const Alexa = require("ask-sdk-core");
const DiscordWebClient = require("../DiscordWebClient");

module.exports = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  },

  async handle(handlerInput) {
    /* Debug */ console.info("[LaunchRequestHandler] -> Received from Alexa.");

    // Get current user to welcome.
    const user = await DiscordWebClient.getCurrentLoggedUser();

    // Build speech.
    const speechText = `Welcome ${user.username} to the Discord unofficial API skill !`;

    // Send welcome.
    /* Debug */ console.info(`[LaunchRequestHandler] <- Sent welcome to ${user.username}.`);
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(`${user.username}, you can ask me anything, like maybe your last mention.`)
      .withSimpleCard(
        speechText,
        "Ask me for anything !"
      )
      .getResponse();
  }
}