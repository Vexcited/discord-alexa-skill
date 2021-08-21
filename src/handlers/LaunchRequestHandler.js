const Alexa = require("ask-sdk-core");
const Discord = require("../utils/Discord");

module.exports = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  },

  async handle(handlerInput) {
    /* Debug */ console.info("[LaunchRequestHandler] -> Received.");

    // Get current user to welcome.
    const user = await Discord.getCurrentLoggedUser();

    // Get Alexa locale language. 
    const languageForSpeech = Alexa.getLocale(handlerInput.requestEnvelope).split("-")[0];
    const speechLanguage = require(`../languages/${languageForSpeech}.json`)["LaunchRequest"];

    // Build speech. 
    const speechText = speechLanguage.speechText.replace("{username}", user.username);
    const repromptText = speechLanguage.repromptText.replace("{username}", user.username);

    // Send welcome.
    /* Debug */ console.info(`[LaunchRequestHandler] <- Sent welcome to ${user.username}.`);
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .withSimpleCard(
        speechText,
        speechLanguage.simpleCardText
      )
      .getResponse();
  }
}